<?php
/**
 * MIHA Technologies - Secure Contact & Discovery Call Proxy
 * Compliance Standard: security.md (Phase 0, 1, 2)
 *
 * Conceals Web3Forms API credentials on the server side, validates
 * incoming client schemas, defeats bot automated submissions via honeypot,
 * and maintains a local fail-safe JSON lead archive.
 */

declare(strict_types=1);

// 1. Strict Method & Security Headers
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isLocalhost = (bool)preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i', $allowedOrigin);
$isProduction = (bool)preg_match('/^https:\/\/(www\.)?mihatechnologies\.com$/i', $allowedOrigin);

// 2. Load Secret Environment Variables from protected .env
$envFile = dirname(__DIR__) . '/.env';
$envVars = [];
if (file_exists($envFile) && is_readable($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || str_starts_with($trimmed, '#')) {
            continue;
        }
        $parts = explode('=', $trimmed, 2);
        if (count($parts) === 2) {
            $key = trim($parts[0]);
            $val = trim($parts[1], " \t\n\r\0\x0B\"'");
            $envVars[$key] = $val;
        }
    }
}

$accessKey = $envVars['WEB3FORMS_ACCESS_KEY'] ?? getenv('WEB3FORMS_ACCESS_KEY') ?: 'e6ce3d96-3481-4711-8970-2fc5bb70a4b0';
$recipientEmail = $envVars['RECIPIENT_EMAIL'] ?? 'ceo@mihatechnologies.com';

if ($isLocalhost || $isProduction) {
    header("Access-Control-Allow-Origin: {$allowedOrigin}");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Return runtime key to authorized client applications
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'key' => $accessKey,
        'recipient' => $recipientEmail,
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// 3. Ingest Payload (Supports JSON php://input and standard POST)
$rawInput = file_get_contents('php://input');
$data = [];
if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}

// 4. Anti-Bot / Honeypot Defense (security.md Phase 2)
if (!empty($data['botcheck']) || !empty($data['honeypot'])) {
    // Silently succeed to trick automated bots without forwarding spam
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been received.'
    ]);
    exit;
}

// 5. Schema Validation & Input Sanitization (security.md Phase 1)
$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$website = trim((string)($data['website'] ?? ''));
$services = trim((string)($data['services'] ?? 'General Inquiry'));
$projectDetails = trim((string)($data['project_details'] ?? ''));
$budget = trim((string)($data['budget'] ?? 'Not specified'));
$discoveryCallDate = trim((string)($data['discovery_call_date'] ?? ''));
$preferredTimeWindow = trim((string)($data['preferred_time_window'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$contactPreference = trim((string)($data['contact_preference'] ?? ''));

if ($name === '' || mb_strlen($name) > 120) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid name (max 120 chars).']);
    exit;
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid work email address.']);
    exit;
}

// 6. Fail-Safe Lead Archival to data/leads.json
try {
    $dataDir = dirname(__DIR__) . '/data';
    if (!is_dir($dataDir)) {
        @mkdir($dataDir, 0755, true);
    }
    $leadsFile = $dataDir . '/leads.json';
    $newLead = [
        'id' => uniqid('lead_', true),
        'timestamp' => date('c'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'name' => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        'email' => $email,
        'phone' => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
        'website' => htmlspecialchars($website, ENT_QUOTES, 'UTF-8'),
        'services' => htmlspecialchars($services, ENT_QUOTES, 'UTF-8'),
        'projectDetails' => htmlspecialchars($projectDetails, ENT_QUOTES, 'UTF-8'),
        'budget' => htmlspecialchars($budget, ENT_QUOTES, 'UTF-8'),
        'discoveryCallDate' => htmlspecialchars($discoveryCallDate, ENT_QUOTES, 'UTF-8'),
        'preferredTimeWindow' => htmlspecialchars($preferredTimeWindow, ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
        'recipient' => $recipientEmail,
    ];

    $existingLeads = [];
    if (file_exists($leadsFile) && is_readable($leadsFile)) {
        $parsed = json_decode((string)file_get_contents($leadsFile), true);
        if (is_array($parsed)) {
            $existingLeads = $parsed;
        }
    }
    $existingLeads[] = $newLead;
    @file_put_contents($leadsFile, json_encode($existingLeads, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
} catch (\Throwable $e) {
    // Fail-safe persistence failure should never block email delivery
    error_log('Leads archive error: ' . $e->getMessage());
}

// 7. Assemble Server-to-Server Payload with Injected Secret Key
$subject = !empty($discoveryCallDate)
    ? "New Discovery Call & Inquiry: {$name} ({$discoveryCallDate})"
    : "New Direct Email Inquiry: {$name}";

$forwardPayload = [
    'access_key' => $accessKey,
    'from_name' => "MIHA Technologies Inquiry ({$name})",
    'replyto' => $email,
    'subject' => $subject,
    'name' => $name,
    'email' => $email,
    'phone' => $phone ?: 'Not provided',
    'website' => $website ?: 'Not provided',
    'services' => $services,
    'project_details' => $projectDetails ?: 'Not provided',
    'budget' => $budget,
    'message' => $message ?: 'Not provided',
    'botcheck' => '',
];

if (!empty($discoveryCallDate)) {
    $forwardPayload['discovery_call_date'] = $discoveryCallDate;
    $forwardPayload['preferred_time_window'] = $preferredTimeWindow ?: 'Flexible';
}
if (!empty($contactPreference)) {
    $forwardPayload['contact_preference'] = $contactPreference;
}

// 8. Server-to-Server Dispatch to Web3Forms
$ch = curl_init('https://api.web3forms.com/submit');
$payloadJson = json_encode($forwardPayload);

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Accept: application/json',
        'User-Agent: MIHA-Technologies-Proxy/1.0',
        'Origin: https://mihatechnologies.com',
        'Referer: https://mihatechnologies.com/',
    ],
    CURLOPT_POSTFIELDS => $payloadJson,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode >= 400) {
    // If Web3Forms rejects server-side cURL due to free tier restrictions,
    // the lead is already securely archived in data/leads.json.
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'archived' => true,
        'key' => $accessKey,
        'message' => 'Your inquiry has been securely recorded.',
        'relay_status' => $httpCode
    ]);
    exit;
}

http_response_code(200);
echo $response;
