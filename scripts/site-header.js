// scripts/site-header.js
// Static markup for the site header. Mirrors the React header (j0 in assets/js/main.js)
// so prerendered pages and the generated /solutions/ pages match what React renders.

const NAV = [
  { key: 'portfolio', label: 'Projects', href: 'portfolio.html' },
  { key: 'about', label: 'About', href: 'about.html' },
  { key: 'services', label: 'Services', href: 'services.html' },
  { key: 'solutions', label: 'Solutions', href: 'solutions/index.html' },
];

function roll(text) {
  return `<span class="relative inline-block overflow-hidden "><span class="roll-main block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">${text}</span><span aria-hidden="true" class="roll-clone absolute top-0 left-0 block w-full transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">${text}</span></span>`;
}

// prefix: path back to the site root ('' for root pages, '../' inside /solutions/).
// active: key of the current page in NAV, or null.
// headerClass: classes for the <header> element itself.
function renderHeader({ prefix = '', active = null, headerClass = 'sticky top-0 z-50 bg-white', indent = '    ' } = {}) {
  const href = (item) => (prefix && item.key === 'solutions' ? 'index.html' : prefix + item.href);
  const link = (item, cls) => {
    const current = item.key === active ? ' aria-current="page"' : '';
    return `<a class="${cls}" href="${href(item)}"${current}><span class="site-nav-label">${roll(item.label)}</span></a>`;
  };
  const lines = [
    `<header class="site-header ${headerClass}">`,
    `  <a href="#main-content" class="skip-link">Skip to content</a>`,
    `  <nav aria-label="Main">`,
    `    <div class="max-w-7xl mx-auto px-6">`,
    `      <div class="flex items-center justify-between py-4 lg:py-6">`,
    `        <div><a class="site-nav-home" href="${prefix}index.html"><img alt="MIHA Technologies home" class="nav-brand-logo h-8 sm:h-9.5" src="${prefix}assets/images/layout/logo-black.svg"></a></div>`,
    `        <div class="hidden lg:block">`,
    `          <ul class="flex space-x-8">`,
    ...NAV.map((item) => `            <li>${link(item, 'site-nav-link group py-4 inline-block uppercase font-normal text-black')}</li>`),
    `          </ul>`,
    `        </div>`,
    `        <div class="flex gap-3 lg:gap-5 items-center"><a class="site-nav-cta group px-4 lg:px-6 py-2.5 lg:py-4.5 hidden sm:inline-flex items-center justify-center bg-black text-xs lg:text-sm font-medium -tracking-[0.2px] leading-5 text-white rounded-full hover:bg-gray-800 transition-all duration-300" href="${prefix}contact.html">${roll('CONTACTS')}</a>`,
    `          <div class="block lg:hidden">`,
    `            <button type="button" class="site-menu-btn text-black font-medium text-sm uppercase" aria-expanded="false" aria-controls="site-menu" data-site-menu-btn>Menu</button>`,
    `            <div id="site-menu" class="site-menu-panel absolute left-0 right-0 top-full mt-0 bg-white border-b border-gray-200 shadow-lg" hidden>`,
    `              <div class="max-w-7xl mx-auto px-6 py-6">`,
    `                <ul class="space-y-1">`,
    ...NAV.map((item) => `                  <li>${link(item, 'site-menu-link group block py-3 text-sm font-normal uppercase text-black')}</li>`),
    `                </ul>`,
    `                <div class="border-t border-gray-200 pt-4 mt-4"><a class="site-nav-cta group px-4 flex items-center justify-center w-full py-3 bg-black text-sm font-medium -tracking-[0.2px] leading-5 text-white rounded-full hover:bg-gray-800 transition text-center" href="${prefix}contact.html">${roll('CONTACTS')}</a></div>`,
    `              </div>`,
    `            </div>`,
    `          </div>`,
    `        </div>`,
    `      </div>`,
    `    </div>`,
    `  </nav>`,
    `</header>`,
  ];
  return lines.map((l) => indent + l).join('\n');
}

module.exports = { renderHeader };
