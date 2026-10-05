/*
 * Legal modal: Privacy Policy & Terms and Conditions.
 * Opens from any link to #privacy-policy or #terms-and-conditions (or [data-legal]),
 * including footer links rendered later by React, and from those hashes on page load.
 */
(function () {
  "use strict";

  var EFFECTIVE = "October 5, 2026";
  var EMAIL = "contact@mihatechnologies.com";
  var MAIL = '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>";

  var DOCS = {
    "privacy-policy": {
      tab: "Privacy Policy",
      title: "Privacy Policy",
      html:
        '<p class="legal-modal-updated">Effective ' + EFFECTIVE + "</p>" +
        "<p>MIHA Technologies (&ldquo;MIHA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a software engineering studio based in Zamboanga City, Philippines. This policy explains what personal information we collect through this website, why we collect it, and the choices you have. We process personal data in line with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules.</p>" +
        "<h3>1. Information we collect</h3>" +
        "<ul>" +
        "<li><strong>Information you give us.</strong> When you use our contact or inquiry form we collect your name, email address, phone number, company website, the services you are interested in, your budget range, and the project details you write.</li>" +
        "<li><strong>Information sent automatically.</strong> Like most websites, our hosting provider receives standard technical data such as your IP address, browser type, device type, and the pages you request. This is used for security and to keep the site running.</li>" +
        "</ul>" +
        "<p>We do not ask for sensitive personal information, and we ask that you do not include passwords, payment card numbers, or government ID numbers in a form message.</p>" +
        "<h3>2. How we use your information</h3>" +
        "<ul>" +
        "<li>To reply to your inquiry, schedule discovery calls, and prepare proposals or quotes.</li>" +
        "<li>To deliver and support a project once we agree to work together.</li>" +
        "<li>To protect the website from spam, abuse, and security threats.</li>" +
        "<li>To meet legal, tax, and accounting obligations.</li>" +
        "</ul>" +
        "<p>We do not sell or rent your personal information, and we do not use it for third-party advertising.</p>" +
        "<h3>3. Legal basis</h3>" +
        "<p>We process your information because you asked us to (your consent when you submit a form), because it is needed to enter into or perform a contract with you, or because we have a legitimate interest in running and securing our business.</p>" +
        "<h3>4. Service providers</h3>" +
        "<p>We share data only with providers that help us operate, and only as much as they need:</p>" +
        "<ul>" +
        "<li><strong>Web3Forms</strong> delivers contact form submissions to our inbox.</li>" +
        "<li><strong>Cloudflare</strong> hosts this website and protects it from attacks.</li>" +
        "<li><strong>Google Fonts</strong> serves the typefaces used on this site, which means your browser requests font files from Google.</li>" +
        "</ul>" +
        "<p>These providers may process data outside the Philippines. Where that happens, we rely on their contractual and security commitments to protect it.</p>" +
        "<h3>5. Cookies and local storage</h3>" +
        "<p>This website does not use advertising or tracking cookies. Our hosting and security provider may set strictly necessary cookies to detect malicious traffic. Your browser may also keep small preferences, such as animation state, in local storage on your own device.</p>" +
        "<h3>6. How long we keep data</h3>" +
        "<p>Inquiries that do not lead to a project are deleted within 24 months. Client records are kept for the length of the engagement and afterwards for as long as Philippine tax and accounting rules require.</p>" +
        "<h3>7. Security</h3>" +
        "<p>Data sent to and from this website is encrypted in transit (HTTPS). Access to inquiries is limited to the team members who need it. No online service can be guaranteed to be completely secure, but we work to protect your information and will notify you and the National Privacy Commission of a breach when the law requires it.</p>" +
        "<h3>8. Your rights</h3>" +
        "<p>Under the Data Privacy Act you have the right to be informed, to access, to correct, to object, to erasure or blocking, to data portability, and to file a complaint with the National Privacy Commission. To use any of these rights, email us at " + MAIL + ". We will respond within 30 days.</p>" +
        "<h3>9. Children</h3>" +
        "<p>This website is meant for businesses and is not directed at children under 18. We do not knowingly collect their personal information.</p>" +
        "<h3>10. Changes to this policy</h3>" +
        "<p>We may update this policy when our services or the law change. The effective date above shows when it was last revised.</p>" +
        "<h3>11. Contact</h3>" +
        "<p>MIHA Technologies, Zamboanga City, Philippines. Email: " + MAIL + ".</p>",
    },
    "terms-and-conditions": {
      tab: "Terms & Conditions",
      title: "Terms & Conditions",
      html:
        '<p class="legal-modal-updated">Effective ' + EFFECTIVE + "</p>" +
        "<p>These terms govern your use of the MIHA Technologies website. By using the site you agree to them. If you do not agree, please do not use the site.</p>" +
        "<h3>1. About us</h3>" +
        "<p>MIHA Technologies (Modern Infrastructure &amp; Hosting Architecture) is a software engineering studio based in Zamboanga City, Philippines, that designs and builds websites, applications, automation, and cloud infrastructure for businesses.</p>" +
        "<h3>2. Use of the website</h3>" +
        "<p>You may browse the site and share its pages for personal or business reference. You agree not to:</p>" +
        "<ul>" +
        "<li>Copy, resell, or republish the site&rsquo;s design, code, or content as your own.</li>" +
        "<li>Try to break, overload, scan, or gain unauthorized access to the site or its systems.</li>" +
        "<li>Submit spam, false information, or harmful code through our forms.</li>" +
        "</ul>" +
        "<h3>3. Information on this site</h3>" +
        "<p>Service descriptions, timelines, benchmarks, and prices on this site are general information, not a binding offer. The scope, price, and schedule of any project are fixed only in a written proposal or agreement signed by both parties.</p>" +
        "<h3>4. Projects and payment</h3>" +
        "<ul>" +
        "<li>Work begins once the agreed deposit (normally 50% of the project fee) has cleared, unless your agreement says otherwise.</li>" +
        "<li>Remaining payments follow the milestones in your proposal. Deliverables may be paused while an invoice is overdue.</li>" +
        "<li>Requests outside the agreed scope are quoted separately before any work starts.</li>" +
        "<li>Third-party costs such as domains, hosting, app store fees, and paid APIs are billed to you or paid by you directly.</li>" +
        "</ul>" +
        "<h3>5. Ownership</h3>" +
        "<p>The content, branding, and code of this website belong to MIHA Technologies. For client projects, ownership of the final source code and deliverables transfers to you once the project is paid in full, as set out in your agreement. Open-source libraries and third-party tools stay under their own licenses. Unless you ask us not to, we may show completed work in our portfolio.</p>" +
        "<h3>6. Third-party links</h3>" +
        "<p>This site links to client projects and other websites we do not control. We are not responsible for their content, availability, or privacy practices.</p>" +
        "<h3>7. Disclaimer</h3>" +
        "<p>The website is provided &ldquo;as is&rdquo;. We work to keep it accurate and available but do not guarantee that it will always be error-free or uninterrupted.</p>" +
        "<h3>8. Limitation of liability</h3>" +
        "<p>To the extent the law allows, MIHA Technologies is not liable for indirect or consequential losses, such as lost profits or data, arising from your use of this website. For client projects, our total liability is limited to the fees paid under the related agreement.</p>" +
        "<h3>9. Privacy</h3>" +
        '<p>How we handle personal information is explained in our <a href="#privacy-policy" data-legal="privacy-policy">Privacy Policy</a>.</p>' +
        "<h3>10. Governing law</h3>" +
        "<p>These terms are governed by the laws of the Republic of the Philippines. Disputes will be brought before the proper courts of Zamboanga City, after both parties first try to settle them in good faith.</p>" +
        "<h3>11. Changes</h3>" +
        "<p>We may update these terms from time to time. The effective date above shows the latest version. Continuing to use the site after a change means you accept the updated terms.</p>" +
        "<h3>12. Contact</h3>" +
        "<p>Questions about these terms? Email " + MAIL + ".</p>",
    },
  };

  var modal, panel, titleEl, bodyEl, tabs, lastFocus, current;

  function build() {
    modal = document.createElement("div");
    modal.className = "legal-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="legal-modal-backdrop" data-legal-close></div>' +
      '<div class="legal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">' +
      '<div class="legal-modal-head"><div>' +
      '<p class="legal-modal-kicker">MIHA Technologies &middot; Legal</p>' +
      '<h2 class="legal-modal-title" id="legal-modal-title"></h2>' +
      "</div>" +
      '<button type="button" class="legal-modal-close" data-legal-close aria-label="Close">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.75" stroke-linecap="square"/></svg>' +
      "</button></div>" +
      '<div class="legal-modal-tabs" role="tablist">' +
      Object.keys(DOCS)
        .map(function (k) {
          return (
            '<button type="button" class="legal-modal-tab" role="tab" data-legal-tab="' + k +
            '" aria-controls="legal-modal-body">' + DOCS[k].tab + "</button>"
          );
        })
        .join("") +
      "</div>" +
      '<div class="legal-modal-body" id="legal-modal-body" role="tabpanel" tabindex="-1" data-lenis-prevent></div>' +
      "</div>";
    document.body.appendChild(modal);
    panel = modal.querySelector(".legal-modal-panel");
    titleEl = modal.querySelector(".legal-modal-title");
    bodyEl = modal.querySelector(".legal-modal-body");
    tabs = modal.querySelectorAll("[data-legal-tab]");

    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-legal-close]")) close();
      var tab = e.target.closest("[data-legal-tab]");
      if (tab) show(tab.getAttribute("data-legal-tab"), true);
    });
    modal.addEventListener("keydown", onKeydown);
  }

  function show(key, fromTab) {
    current = key;
    titleEl.textContent = DOCS[key].title;
    bodyEl.innerHTML = DOCS[key].html;
    bodyEl.scrollTop = 0;
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-legal-tab") === key;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    if (history.replaceState) history.replaceState(null, "", "#" + key);
    if (fromTab) bodyEl.focus({ preventScroll: true });
  }

  function open(key) {
    if (!DOCS[key]) return;
    if (!modal) build();
    if (!modal.classList.contains("is-open")) lastFocus = document.activeElement;
    show(key, false);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("legal-modal-open");
    if (window.lenis && window.lenis.stop) window.lenis.stop();
    modal.querySelector(".legal-modal-close").focus({ preventScroll: true });
  }

  function close() {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("legal-modal-open");
    if (window.lenis && window.lenis.start) window.lenis.start();
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (!e.target.closest("[data-legal-tab]")) return;
      var keys = Object.keys(DOCS);
      var i = keys.indexOf(current) + (e.key === "ArrowRight" ? 1 : -1);
      var next = keys[(i + keys.length) % keys.length];
      show(next, false);
      modal.querySelector('[data-legal-tab="' + next + '"]').focus();
      return;
    }
    if (e.key !== "Tab") return;
    var f = panel.querySelectorAll('button:not([tabindex="-1"]), a[href], [tabindex="0"]');
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function keyFromLink(a) {
    var k = a.getAttribute("data-legal");
    if (k) return k;
    var href = a.getAttribute("href") || "";
    var hash = href.slice(href.indexOf("#") + 1);
    return href.indexOf("#") !== -1 && DOCS[hash] ? hash : null;
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest && e.target.closest("a[href*='#'], [data-legal]");
      if (!a) return;
      var key = keyFromLink(a);
      if (!key) return;
      e.preventDefault();
      e.stopPropagation();
      open(key);
    },
    true
  );

  function openFromHash() {
    var key = location.hash.slice(1);
    if (DOCS[key]) open(key);
  }

  window.addEventListener("hashchange", openFromHash);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", openFromHash);
  } else {
    openFromHash();
  }

  window.MihaLegal = { open: open, close: close };
})();
