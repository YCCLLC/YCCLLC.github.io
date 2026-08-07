const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://yccllc.github.io";
let generatedCount = 0;

const departments = [
  {
    slug: "strategy-advisory",
    name: "Strategy & Executive Advisory",
    summary: "Clarify direction, sharpen operating choices, and translate ambition into an executable agenda.",
    capabilities: [
      ["Enterprise strategy", "Growth priorities, strategic choices, and measurable objectives."],
      ["Operating model design", "Decision rights, governance, roles, and cross-functional alignment."],
      ["Executive decision support", "Structured analysis and facilitation for high-stakes decisions."],
      ["Market and portfolio strategy", "Opportunity assessment, prioritization, and investment roadmaps."],
    ],
    deliverables: ["Strategic agenda", "Operating model blueprint", "Executive roadmap", "Decision framework", "Performance scorecard"],
    engagements: ["Strategy sprint", "Executive advisory retainer", "Operating model redesign", "Annual planning support"],
  },
  {
    slug: "transformation-delivery",
    name: "Transformation Delivery",
    summary: "Mobilize complex change, coordinate execution, and keep transformation outcomes visible.",
    capabilities: [
      ["Transformation office", "Integrated governance, reporting, dependencies, and decision management."],
      ["Execution mobilization", "Workstream design, leadership alignment, and launch planning."],
      ["Benefits realization", "Outcome definitions, value tracking, and corrective action."],
      ["Change integration", "Coordination across process, technology, and workforce changes."],
    ],
    deliverables: ["Transformation charter", "Integrated roadmap", "Benefits register", "Executive dashboard", "Decision log"],
    engagements: ["Transformation office setup", "Recovery and acceleration", "Major initiative mobilization", "Delivery assurance"],
  },
  {
    slug: "program-management",
    name: "Program & Portfolio Management",
    summary: "Build the governance, planning, and accountability systems needed for reliable delivery.",
    capabilities: [
      ["Portfolio governance", "Prioritization, intake, funding, and executive oversight."],
      ["Program planning", "Milestones, dependencies, risks, resources, and critical paths."],
      ["Delivery assurance", "Independent health reviews and recovery planning."],
      ["PMO design", "Standards, operating cadence, templates, and capability building."],
    ],
    deliverables: ["Portfolio model", "Integrated plan", "RAID framework", "Governance calendar", "Status dashboard"],
    engagements: ["PMO launch", "Portfolio reset", "Program recovery", "Fractional program leadership"],
  },
  {
    slug: "revenue-growth",
    name: "Revenue & Growth Operations",
    summary: "Improve pipeline quality, forecasting discipline, commercial execution, and revenue visibility.",
    capabilities: [
      ["Go-to-market design", "Segments, motions, channels, coverage, and account priorities."],
      ["Pipeline architecture", "Stage definitions, qualification, conversion, and inspection cadence."],
      ["Forecasting", "Data standards, methodology, risk assessment, and executive reporting."],
      ["Commercial performance", "Metrics, incentives, coaching, and operating rhythms."],
    ],
    deliverables: ["GTM blueprint", "Pipeline taxonomy", "Forecast model", "Revenue dashboard", "Sales operating cadence"],
    engagements: ["Revenue diagnostic", "Pipeline redesign", "Forecast transformation", "Growth operating model"],
  },
  {
    slug: "technology-architecture",
    name: "Technology & Architecture",
    summary: "Align technology investments with business priorities and create practical modernization roadmaps.",
    capabilities: [
      ["Technology strategy", "Business-aligned principles, priorities, and investment sequencing."],
      ["Enterprise architecture", "Capability, application, data, integration, and platform views."],
      ["Modernization planning", "Current-state assessment, target state, and migration roadmap."],
      ["Vendor and platform decisions", "Requirements, evaluation frameworks, and implementation planning."],
    ],
    deliverables: ["Technology strategy", "Target architecture", "Modernization roadmap", "Capability map", "Decision scorecard"],
    engagements: ["Architecture assessment", "Modernization strategy", "Platform selection", "Fractional architecture leadership"],
  },
  {
    slug: "data-analytics",
    name: "Data, Analytics & AI",
    summary: "Turn fragmented data into trusted insight, operational visibility, and responsible intelligent capabilities.",
    capabilities: [
      ["Data strategy", "Priority use cases, ownership, architecture, and investment roadmap."],
      ["Analytics operating model", "Decision products, metrics, teams, and delivery workflow."],
      ["AI opportunity design", "Use-case qualification, value hypotheses, and responsible adoption."],
      ["Data governance", "Accountability, quality, access, privacy, and lifecycle controls."],
    ],
    deliverables: ["Data strategy", "Use-case portfolio", "Metric framework", "Governance model", "AI adoption roadmap"],
    engagements: ["Data maturity assessment", "Analytics transformation", "AI strategy sprint", "Governance launch"],
  },
  {
    slug: "people-change",
    name: "People, Organization & Change",
    summary: "Equip leaders and teams to adopt new ways of working and sustain performance through change.",
    capabilities: [
      ["Organization design", "Structures, spans, layers, roles, and decision accountability."],
      ["Change strategy", "Stakeholders, impacts, communications, readiness, and adoption."],
      ["Leadership alignment", "Shared outcomes, behavior commitments, and operating cadence."],
      ["Performance enablement", "Goals, scorecards, feedback, coaching, and capability plans."],
    ],
    deliverables: ["Organization blueprint", "Change plan", "Stakeholder map", "Leadership charter", "Adoption dashboard"],
    engagements: ["Organization redesign", "Change office setup", "Leadership alignment", "Performance system design"],
  },
  {
    slug: "risk-governance",
    name: "Risk, Governance & Controls",
    summary: "Strengthen oversight, clarify accountability, and integrate risk management into execution.",
    capabilities: [
      ["Governance design", "Forums, mandates, decision rights, escalation, and reporting."],
      ["Enterprise risk", "Risk taxonomy, assessment, ownership, treatment, and monitoring."],
      ["Control design", "Practical controls embedded into operating processes."],
      ["Resilience planning", "Critical services, scenarios, continuity, and response readiness."],
    ],
    deliverables: ["Governance framework", "Risk register", "Control matrix", "Resilience roadmap", "Executive reporting pack"],
    engagements: ["Governance reset", "Risk program design", "Control improvement", "Resilience assessment"],
  },
];

const industries = [
  {
    slug: "professional-services",
    name: "Professional Services",
    summary: "Improve utilization, delivery quality, commercial discipline, and scalable knowledge-based operations.",
    priorities: ["Service portfolio strategy", "Resource and capacity planning", "Engagement economics", "Client delivery governance", "Partner and leader scorecards"],
  },
  {
    slug: "technology",
    name: "Technology",
    summary: "Connect product, platform, customer, and operating priorities across fast-moving technology businesses.",
    priorities: ["Product and portfolio strategy", "Go-to-market alignment", "Cloud and platform modernization", "Customer success operations", "Responsible AI adoption"],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    summary: "Balance growth, modernization, customer experience, governance, and operational resilience.",
    priorities: ["Operating model modernization", "Risk-aware transformation", "Data and analytics governance", "Process efficiency", "Portfolio delivery assurance"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "Support complex transformation while keeping patient, workforce, operational, and compliance needs aligned.",
    priorities: ["Care and service operations", "Digital transformation", "Program governance", "Workforce change", "Data-enabled decision support"],
  },
  {
    slug: "public-sector",
    name: "Public Sector",
    summary: "Improve mission delivery through transparent governance, modernization planning, and measurable outcomes.",
    priorities: ["Mission and program strategy", "Portfolio governance", "Technology modernization", "Performance measurement", "Stakeholder alignment"],
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial & Manufacturing",
    summary: "Coordinate commercial, operational, technology, and workforce initiatives across complex value chains.",
    priorities: ["Operational transformation", "Portfolio and capital governance", "Digital operations", "Commercial excellence", "Workforce enablement"],
  },
];

const perspectives = [
  {
    slug: "operating-models",
    title: "Operating models that make strategy executable",
    summary: "A practical operating model connects strategic choices to decisions, accountabilities, workflows, information, and measures.",
    sections: [
      ["Start with the decisions", "Organization charts rarely explain how work should move. Begin by identifying the critical decisions that drive value, who owns them, who contributes, and what information is required."],
      ["Design the management system", "Translate the strategy into planning, review, escalation, and performance cadences. The management system should make priorities visible and surface tradeoffs early."],
      ["Connect structure to capability", "Roles and reporting lines matter, but only when paired with the capabilities, processes, technology, and measures required to deliver the strategy."],
      ["Build for learning", "Treat the operating model as a system that can evolve. Define feedback loops, review points, and clear triggers for adjustment."],
    ],
  },
  {
    slug: "program-governance",
    title: "Program governance without unnecessary bureaucracy",
    summary: "Effective governance accelerates delivery by creating clear decisions, timely escalation, and trustworthy information.",
    sections: [
      ["Make every forum decision-oriented", "Each governance forum should have a mandate, defined decisions, required inputs, and accountable participants. Status reporting alone is not governance."],
      ["Separate signal from volume", "Focus executive reporting on outcomes, milestones, dependencies, risks, decisions, and value. Detailed activity belongs at the workstream level."],
      ["Create explicit escalation paths", "Teams need to know which issues they own, what thresholds require escalation, and how quickly leaders will respond."],
      ["Review whether governance is working", "Measure decision cycle time, issue aging, milestone reliability, and action closure to improve the governance system itself."],
    ],
  },
  {
    slug: "revenue-forecasting",
    title: "Forecasting as a management discipline",
    summary: "A useful forecast is not only a number. It is a shared view of assumptions, evidence, risk, and the actions needed to improve outcomes.",
    sections: [
      ["Define stages with evidence", "Opportunity stages should reflect observable customer progress, not seller confidence. Clear entry and exit criteria improve comparability and coaching."],
      ["Separate commitment from possibility", "Use consistent forecast categories and require explicit rationale for movement. This creates a clearer view of downside and upside."],
      ["Inspect changes, not just totals", "Review what entered, advanced, slipped, changed value, or closed. Movement reveals the health of the commercial system."],
      ["Connect insight to action", "Forecast meetings should conclude with owners and actions that improve deal quality, remove barriers, or address coverage gaps."],
    ],
  },
];

const illustrativeWork = [
  {
    slug: "transformation-office",
    title: "Enterprise transformation office",
    context: "A multi-workstream transformation needs a common governance model, integrated plan, and consistent executive visibility.",
    approach: ["Establish outcomes and workstream charters", "Create integrated milestones and dependencies", "Design decision and escalation forums", "Implement benefits, risk, and action tracking"],
    outcomes: ["Clearer executive decisions", "Earlier dependency visibility", "More consistent milestone management", "Transparent benefits ownership"],
  },
  {
    slug: "revenue-operations",
    title: "Revenue operations redesign",
    context: "Leadership needs a more reliable view of pipeline health, forecast risk, and the actions required to improve conversion.",
    approach: ["Standardize stages and qualification evidence", "Define forecast categories and inspection cadence", "Create pipeline and performance dashboards", "Align coaching to conversion constraints"],
    outcomes: ["Stronger pipeline consistency", "Clearer forecast assumptions", "Focused leadership interventions", "Improved commercial accountability"],
  },
  {
    slug: "technology-roadmap",
    title: "Technology modernization roadmap",
    context: "A fragmented application landscape requires a business-led target architecture and sequenced modernization plan.",
    approach: ["Map business capabilities and technology dependencies", "Assess applications, platforms, data, and integrations", "Define target-state principles and architecture", "Sequence initiatives by value, risk, and dependency"],
    outcomes: ["Shared target-state direction", "Transparent investment choices", "Reduced sequencing risk", "Business-aligned modernization priorities"],
  },
];

const navigation = [
  ["/services/", "Services"],
  ["/industries/", "Industries"],
  ["/work/", "Illustrative Work"],
  ["/insights/", "Insights"],
  ["/about/", "About"],
  ["/careers/", "Careers"],
];

function themeScript() {
  return `<script>
      (() => {
        const param = new URLSearchParams(window.location.search).get("clawpilotTheme");
        const theme =
          param || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      })();
    </script>`;
}

function nav(active) {
  const departmentLinks = departments
    .map((item) => `<a href="/departments/${item.slug}/">${item.name}</a>`)
    .join("");
  const links = navigation
    .map(([href, label]) => `<a href="${href}"${active === href ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("");

  return `<header class="site-header">
      <nav class="nav container" aria-label="Primary navigation">
        <a class="brand" href="/">
          <img src="/YCC_Logo.jpeg" alt="">
          <span>Yardley Crest Solutions</span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" data-menu-toggle>
          <span aria-hidden="true">&#9776;</span><span class="sr-only">Menu</span>
        </button>
        <div class="nav-links" id="site-navigation">
          <div class="nav-dropdown">
            <button type="button">Departments</button>
            <div class="dropdown-panel">${departmentLinks}</div>
          </div>
          ${links}
          <a class="button" href="/contact/">Contact</a>
        </div>
      </nav>
    </header>`;
}

function footer() {
  return `<footer class="site-footer">
      <div class="footer-grid container">
        <div class="footer-brand">
          <img src="/YCC_Logo.jpeg" alt="Yardley Crest Solutions">
          <p>Strategy, architecture, and disciplined execution for measurable business impact.</p>
        </div>
        <div class="footer-column">
          <h3>Company</h3>
          <a href="/about/">About</a>
          <a href="/leadership/">Leadership</a>
          <a href="/careers/">Careers</a>
          <a href="/partners/">Partners</a>
        </div>
        <div class="footer-column">
          <h3>Explore</h3>
          <a href="/services/">Services</a>
          <a href="/industries/">Industries</a>
          <a href="/work/">Illustrative work</a>
          <a href="/insights/">Insights</a>
        </div>
        <div class="footer-column">
          <h3>Connect</h3>
          <a href="/contact/">Contact</a>
          <a href="/client-resources/">Client resources</a>
          <a href="https://github.com/YCCLLC">GitHub organization</a>
          <a href="https://github.com/Ab3y/YCC">Consulting platform</a>
        </div>
      </div>
      <div class="footer-bottom container">
        <span>&copy; <span data-current-year></span> Yardley Crest Solutions LLC.</span>
        <div class="footer-bottom-links">
          <a href="/accessibility/">Accessibility</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </div>
      </div>
    </footer>`;
}

function layout({ title, description, active = "", eyebrow, heading, intro, breadcrumbs = [], content }) {
  const breadcrumbHtml = [
    `<a href="/">Home</a>`,
    ...breadcrumbs.map(([href, label], index) =>
      index === breadcrumbs.length - 1
        ? `<span aria-current="page">${label}</span>`
        : `<a href="${href}">${label}</a>`
    ),
  ].join("<span aria-hidden=\"true\">/</span>");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="description" content="${escapeAttribute(description)}">
    <meta property="og:title" content="${escapeAttribute(title)}">
    <meta property="og:description" content="${escapeAttribute(description)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${siteUrl}/YCC_Logo.jpeg">
    <title>${title} | Yardley Crest Solutions</title>
    ${themeScript()}
    <link rel="stylesheet" href="/assets/styles.css">
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    ${nav(active)}
    <main id="main-content">
      <header class="page-hero">
        <div class="page-hero-inner container">
          <div class="breadcrumbs">${breadcrumbHtml}</div>
          <span class="eyebrow">${eyebrow}</span>
          <h1>${heading}</h1>
          <p class="lead">${intro}</p>
        </div>
      </header>
      ${content}
    </main>
    ${footer()}
    <script src="/assets/site.js"></script>
  </body>
</html>
`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function cards(items, columns = "three") {
  return `<div class="grid ${columns}">${items
    .map(
      (item, index) => `<article class="card link-card">
          <div class="card-number">${String(index + 1).padStart(2, "0")}</div>
          <h3>${item.name || item.title}</h3>
          <p>${item.summary}</p>
          <a href="${item.href}">Explore <span aria-hidden="true">&rarr;</span></a>
        </article>`
    )
    .join("")}</div>`;
}

function featureList(items) {
  return `<ul class="feature-list">${items
    .map(([title, description]) => `<li><strong>${title}</strong><span>${description}</span></li>`)
    .join("")}</ul>`;
}

function pillList(items) {
  return `<ul class="pill-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function cta(title = "Start a focused conversation.", text = "Connect with Yardley Crest to discuss the outcomes, constraints, and decisions shaping your next initiative.") {
  return `<section>
      <div class="container">
        <div class="cta">
          <span class="eyebrow">Next step</span>
          <h2>${title}</h2>
          <p>${text}</p>
          <div class="actions" style="justify-content:center">
            <a class="button" href="/contact/">Connect with us</a>
            <a class="button secondary" href="/services/">Explore services</a>
          </div>
        </div>
      </div>
    </section>`;
}

function writePage(route, html) {
  const directory = path.join(root, route.replace(/^\/|\/$/g, ""));
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), html);
  generatedCount += 1;
}

function buildServices() {
  writePage(
    "/services/",
    layout({
      title: "Services",
      description: "Consulting services spanning strategy, transformation, program delivery, revenue, technology, data, people, and governance.",
      active: "/services/",
      eyebrow: "Capabilities",
      heading: "Connected expertise for complex business priorities.",
      intro: "Our departments work together to move from strategic choice to operating design, implementation, adoption, and measurable performance.",
      breadcrumbs: [["/services/", "Services"]],
      content: `<section>
          <div class="container">
            <div class="section-heading">
              <h2>Consulting departments</h2>
              <p>Engage one focused capability or combine departments around a cross-functional transformation.</p>
            </div>
            ${cards(departments.map((item) => ({ ...item, href: `/departments/${item.slug}/` })), "two")}
          </div>
        </section>
        <section class="section-alt">
          <div class="split container">
            <div>
              <span class="eyebrow">Engagement model</span>
              <h2>Designed around the outcome, not a fixed template.</h2>
            </div>
            <div>
              ${featureList([
                ["Diagnose", "Establish a fact base, define the problem, and identify the highest-value decisions."],
                ["Design", "Create the strategy, operating model, roadmap, governance, and measures."],
                ["Deliver", "Mobilize teams, manage dependencies, resolve issues, and maintain momentum."],
                ["Embed", "Transfer capability, strengthen routines, and establish sustainable ownership."],
              ])}
            </div>
          </div>
        </section>
        ${cta()}`
    })
  );

  departments.forEach((department) => {
    writePage(
      `/departments/${department.slug}/`,
      layout({
        title: department.name,
        description: department.summary,
        active: "/services/",
        eyebrow: "Consulting department",
        heading: department.name,
        intro: department.summary,
        breadcrumbs: [["/services/", "Services"], [`/departments/${department.slug}/`, department.name]],
        content: `<section>
            <div class="split container">
              <div>
                <span class="eyebrow">Core capabilities</span>
                <h2>Where we can help.</h2>
                <p class="lead">Focused support can address a discrete need or connect into a broader enterprise initiative.</p>
              </div>
              <div>${featureList(department.capabilities)}</div>
            </div>
          </section>
          <section class="section-alt">
            <div class="container">
              <div class="grid two">
                <article class="card">
                  <div class="card-kicker">Representative deliverables</div>
                  <h3>Artifacts that support decisions and execution</h3>
                  ${pillList(department.deliverables)}
                </article>
                <article class="card">
                  <div class="card-kicker">Ways to engage</div>
                  <h3>Flexible support for different stages</h3>
                  ${pillList(department.engagements)}
                </article>
              </div>
            </div>
          </section>
          ${cta(`Move ${department.name.toLowerCase()} forward.`)}`
      })
    );
  });
}

function buildIndustries() {
  writePage(
    "/industries/",
    layout({
      title: "Industries",
      description: "Industry-informed consulting for professional services, technology, financial services, healthcare, public sector, and manufacturing.",
      active: "/industries/",
      eyebrow: "Industry context",
      heading: "Business fundamentals, adapted to your environment.",
      intro: "We combine cross-industry operating expertise with the regulatory, commercial, workforce, and delivery realities of each sector.",
      breadcrumbs: [["/industries/", "Industries"]],
      content: `<section><div class="container">${cards(industries.map((item) => ({ ...item, href: `/industries/${item.slug}/` })), "three")}</div></section>${cta()}`
    })
  );

  industries.forEach((industry) => {
    writePage(
      `/industries/${industry.slug}/`,
      layout({
        title: industry.name,
        description: industry.summary,
        active: "/industries/",
        eyebrow: "Industry",
        heading: industry.name,
        intro: industry.summary,
        breadcrumbs: [["/industries/", "Industries"], [`/industries/${industry.slug}/`, industry.name]],
        content: `<section>
            <div class="split container">
              <div>
                <span class="eyebrow">Priority areas</span>
                <h2>Where organizations are focusing.</h2>
                <p class="lead">The right agenda depends on strategy, maturity, constraints, and stakeholder expectations.</p>
              </div>
              <div>${featureList(industry.priorities.map((item) => [item, "Integrated strategy, design, execution, and performance support."]))}</div>
            </div>
          </section>
          <section class="section-alt">
            <div class="container">
              <div class="section-heading">
                <h2>Relevant departments</h2>
                <p>Cross-functional teams can be assembled around the specific business outcome.</p>
              </div>
              ${cards(departments.slice(0, 4).map((item) => ({ ...item, href: `/departments/${item.slug}/` })), "two")}
            </div>
          </section>
          ${cta(`Discuss priorities in ${industry.name.toLowerCase()}.`)}`
      })
    );
  });
}

function buildWork() {
  const workCards = illustrativeWork.map((item) => ({
    ...item,
    summary: item.context,
    href: `/work/${item.slug}/`,
  }));
  writePage(
    "/work/",
    layout({
      title: "Illustrative Work",
      description: "Illustrative consulting engagement patterns showing how Yardley Crest approaches transformation, revenue, and technology priorities.",
      active: "/work/",
      eyebrow: "Engagement patterns",
      heading: "Examples of how the work can come together.",
      intro: "These scenarios illustrate representative approaches and potential outcomes. They are not claims about named client engagements.",
      breadcrumbs: [["/work/", "Illustrative Work"]],
      content: `<section><div class="container"><div class="notice">The examples below are illustrative and do not identify or describe a specific client.</div><div style="height:24px"></div>${cards(workCards, "three")}</div></section>${cta()}`
    })
  );

  illustrativeWork.forEach((item) => {
    writePage(
      `/work/${item.slug}/`,
      layout({
        title: item.title,
        description: item.context,
        active: "/work/",
        eyebrow: "Illustrative engagement",
        heading: item.title,
        intro: item.context,
        breadcrumbs: [["/work/", "Illustrative Work"], [`/work/${item.slug}/`, item.title]],
        content: `<section>
            <div class="grid two container">
              <article class="card">
                <div class="card-kicker">Representative approach</div>
                ${featureList(item.approach.map((step, index) => [`Step ${index + 1}`, step]))}
              </article>
              <article class="card">
                <div class="card-kicker">Potential outcomes</div>
                ${featureList(item.outcomes.map((outcome) => [outcome, "Outcome depends on context, adoption, and execution."]))}
              </article>
            </div>
          </section>
          <section class="section-alt">
            <div class="container narrow prose">
              <h2>How the engagement would be tailored</h2>
              <p>Scope, pace, governance, and deliverables would be adapted to the organization's starting point, leadership needs, available data, internal capabilities, and risk profile.</p>
              <p>Early work would establish the fact base and decision agenda before committing to a detailed implementation sequence.</p>
            </div>
          </section>
          ${cta()}`
      })
    );
  });
}

function buildInsights() {
  writePage(
    "/insights/",
    layout({
      title: "Insights",
      description: "Practical perspectives on operating models, program governance, revenue forecasting, and business execution.",
      active: "/insights/",
      eyebrow: "Perspectives",
      heading: "Ideas for clearer decisions and stronger execution.",
      intro: "Concise guidance for leaders working across strategy, transformation, commercial performance, technology, and organizational change.",
      breadcrumbs: [["/insights/", "Insights"]],
      content: `<section><div class="container">${cards(perspectives.map((item) => ({ ...item, name: item.title, href: `/insights/${item.slug}/` })), "three")}</div></section>${cta("Turn perspective into action.")}`
    })
  );

  perspectives.forEach((article) => {
    writePage(
      `/insights/${article.slug}/`,
      layout({
        title: article.title,
        description: article.summary,
        active: "/insights/",
        eyebrow: "Perspective",
        heading: article.title,
        intro: article.summary,
        breadcrumbs: [["/insights/", "Insights"], [`/insights/${article.slug}/`, article.title]],
        content: `<section><article class="container prose">${article.sections
          .map(([heading, body]) => `<h2>${heading}</h2><p>${body}</p>`)
          .join("")}<div class="notice">The strongest management systems are simple enough to use consistently and rigorous enough to improve decisions.</div></article></section>${cta()}`
      })
    );
  });
}

function buildCompanyPages() {
  writePage(
    "/about/",
    layout({
      title: "About",
      description: "Yardley Crest Solutions combines strategic clarity with operational rigor to help organizations deliver measurable outcomes.",
      active: "/about/",
      eyebrow: "About Yardley Crest",
      heading: "Practical consulting for ambitious outcomes.",
      intro: "Yardley Crest Solutions helps organizations align strategy, operating design, execution, and performance.",
      breadcrumbs: [["/about/", "About"]],
      content: `<section>
          <div class="split container">
            <div><span class="eyebrow">Our promise</span><h2>Clarity, accountability, and momentum.</h2></div>
            <div>
              ${featureList([
                ["Strategic clarity", "Define the choices, outcomes, and measures that matter."],
                ["Operational rigor", "Create practical plans, governance, and ownership."],
                ["Transparent progress", "Make milestones, risks, decisions, and value visible."],
                ["Capability transfer", "Build systems and skills that remain with the organization."],
              ])}
            </div>
          </div>
        </section>
        <section class="section-alt">
          <div class="container">
            <div class="section-heading"><h2>Our working principles</h2></div>
            <div class="stats">
              <div class="stat"><strong>Outcome-led</strong><span>Begin with measurable business value.</span></div>
              <div class="stat"><strong>Evidence-based</strong><span>Use facts to sharpen choices and reduce noise.</span></div>
              <div class="stat"><strong>Collaborative</strong><span>Work with teams so solutions are owned and sustained.</span></div>
            </div>
          </div>
        </section>
        ${cta()}`
    })
  );

  writePage(
    "/leadership/",
    layout({
      title: "Leadership",
      description: "The leadership principles and client accountability model behind Yardley Crest Solutions.",
      active: "/about/",
      eyebrow: "Leadership",
      heading: "Senior accountability from direction through delivery.",
      intro: "Leadership profiles will be published once approved. Our engagement model is designed around clear ownership, direct communication, and decision-ready work.",
      breadcrumbs: [["/about/", "About"], ["/leadership/", "Leadership"]],
      content: `<section>
          <div class="container">
            <div class="grid three">
              <article class="card"><div class="card-kicker">Client leadership</div><h3>One accountable relationship</h3><p>A clear engagement lead coordinates priorities, decisions, quality, and communication.</p></article>
              <article class="card"><div class="card-kicker">Expert leadership</div><h3>Capability matched to need</h3><p>Specialists are aligned to the business problem, delivery stage, and operating context.</p></article>
              <article class="card"><div class="card-kicker">Delivery leadership</div><h3>Visible execution discipline</h3><p>Milestones, dependencies, risks, and outcomes remain transparent throughout the work.</p></article>
            </div>
          </div>
        </section>
        <section class="section-alt"><div class="container narrow"><div class="empty-state"><h2>Leadership profiles coming soon</h2><p>Names, biographies, and professional credentials will be added after final approval.</p></div></div></section>
        ${cta()}`
    })
  );

  writePage(
    "/partners/",
    layout({
      title: "Partners",
      description: "Partnership opportunities for independent experts, technology providers, and complementary professional services firms.",
      active: "/about/",
      eyebrow: "Partner ecosystem",
      heading: "Complementary expertise, coordinated around client outcomes.",
      intro: "We are open to thoughtful collaboration with organizations and specialists whose capabilities strengthen delivery.",
      breadcrumbs: [["/partners/", "Partners"]],
      content: `<section>
          <div class="container">
            <div class="grid three">
              <article class="card"><div class="card-kicker">Expert network</div><h3>Independent specialists</h3><p>Deep functional or industry expertise aligned to specific engagement needs.</p></article>
              <article class="card"><div class="card-kicker">Technology ecosystem</div><h3>Platforms and solution providers</h3><p>Technology capabilities that support implementation, insight, and operational scale.</p></article>
              <article class="card"><div class="card-kicker">Professional services</div><h3>Complementary firms</h3><p>Legal, financial, engineering, creative, research, and other adjacent expertise.</p></article>
            </div>
          </div>
        </section>
        ${cta("Explore a partnership conversation.", "Use the contact page to share your capabilities, relevant experience, and the types of client outcomes you support.")}`
    })
  );

  writePage(
    "/careers/",
    layout({
      title: "Careers",
      description: "Career and independent consulting opportunities with Yardley Crest Solutions.",
      active: "/careers/",
      eyebrow: "Careers",
      heading: "Do practical work with visible impact.",
      intro: "We value structured thinking, clear communication, accountable delivery, and respect for the teams doing the work.",
      breadcrumbs: [["/careers/", "Careers"]],
      content: `<section>
          <div class="split container">
            <div><span class="eyebrow">Who thrives here</span><h2>Experts who can connect insight to execution.</h2></div>
            <div>
              ${featureList([
                ["Structured problem solvers", "Turn ambiguity into clear questions, evidence, options, and decisions."],
                ["Collaborative operators", "Work effectively with leaders, teams, partners, and stakeholders."],
                ["Clear communicators", "Make complex work understandable, actionable, and decision-ready."],
                ["Accountable professionals", "Own commitments, surface risks early, and protect quality."],
              ])}
            </div>
          </div>
        </section>
        <section class="section-alt"><div class="container narrow"><div class="empty-state"><h2>Open roles will be published here</h2><p>No specific role is being advertised on this page at this time. Future employee and independent consultant opportunities will include scope, qualifications, location, and application instructions.</p></div></div></section>
        ${cta("Introduce your expertise.", "Share a concise overview of your capabilities and the outcomes you have helped organizations achieve.")}`
    })
  );

  writePage(
    "/client-resources/",
    layout({
      title: "Client Resources",
      description: "Resources and platform links for Yardley Crest Solutions clients and collaborators.",
      eyebrow: "Client resources",
      heading: "A clear place for shared work and delivery visibility.",
      intro: "Client-specific access instructions are provided directly as part of each engagement.",
      breadcrumbs: [["/client-resources/", "Client Resources"]],
      content: `<section>
          <div class="container">
            <div class="grid two">
              <article class="card"><div class="card-kicker">Consulting platform</div><h3>Engagement operations</h3><p>The Yardley Crest platform supports opportunities, projects, milestones, comments, reporting, and administration.</p><a href="https://github.com/Ab3y/YCC">View the platform repository</a></article>
              <article class="card"><div class="card-kicker">Access support</div><h3>Need help accessing a resource?</h3><p>Use the approved contact channel supplied by your Yardley Crest engagement lead. Do not post confidential client information on public GitHub pages.</p><a href="/contact/">View contact options</a></article>
            </div>
          </div>
        </section>
        <section class="section-alt"><div class="container narrow"><div class="notice">Protect confidential information. Public repositories and public contact channels should never be used for client data, credentials, or sensitive engagement materials.</div></div></section>`
    })
  );

  writePage(
    "/contact/",
    layout({
      title: "Contact",
      description: "Connect with Yardley Crest Solutions through its official GitHub presence.",
      eyebrow: "Contact",
      heading: "Start with the outcome you need to achieve.",
      intro: "Verified business email, telephone, and office information will be added once approved for public use.",
      breadcrumbs: [["/contact/", "Contact"]],
      content: `<section>
          <div class="container">
            <div class="grid two">
              <article class="card"><div class="card-kicker">Official organization</div><h3>YCCLLC on GitHub</h3><p>Review the public organization profile and published repositories.</p><a href="https://github.com/YCCLLC">Visit the organization</a></article>
              <article class="card"><div class="card-kicker">Company platform</div><h3>Yardley Crest platform</h3><p>Explore the source repository used as the current public reference for the company's capabilities.</p><a href="https://github.com/Ab3y/YCC">View the repository</a></article>
            </div>
          </div>
        </section>
        <section class="section-alt"><div class="container narrow"><div class="notice">Do not send confidential, personal, financial, or regulated information through public GitHub channels.</div></div></section>`
    })
  );
}

function buildPolicyPages() {
  const policies = [
    {
      route: "/accessibility/",
      title: "Accessibility",
      intro: "Yardley Crest aims to make its public digital experiences usable by as many people as possible.",
      sections: [
        ["Our approach", "The site uses semantic structure, keyboard-accessible navigation, visible focus behavior, responsive layouts, descriptive link text, and color contrast designed for readability."],
        ["Ongoing improvement", "Accessibility is an ongoing practice. Content and interaction patterns should be reviewed as the site evolves and as new public services are introduced."],
        ["Feedback", "If you encounter an accessibility barrier, use the official contact options on this site and describe the page, task, and assistive technology involved."],
      ],
    },
    {
      route: "/privacy/",
      title: "Privacy",
      intro: "This static website is designed to collect as little personal information as possible.",
      sections: [
        ["Information collected", "The site does not currently include account registration, analytics scripts, advertising trackers, or a hosted contact form. GitHub may process technical information when serving GitHub Pages."],
        ["External links", "Links to GitHub and other services are governed by those services' privacy practices. Review their notices before submitting information."],
        ["Sensitive information", "Do not send confidential client data, credentials, financial information, health information, or other sensitive content through public repositories or public GitHub channels."],
        ["Changes", "This notice may be updated as the website, contact methods, analytics, or client services evolve."],
      ],
    },
    {
      route: "/terms/",
      title: "Terms of Use",
      intro: "These baseline terms describe use of the Yardley Crest public website.",
      sections: [
        ["Informational purpose", "Website content is provided for general informational purposes and does not create a consulting, fiduciary, legal, tax, accounting, employment, or other professional relationship."],
        ["No guarantee", "Illustrative approaches and potential outcomes depend on context, implementation, leadership decisions, data quality, and other factors. Results are not guaranteed."],
        ["Intellectual property", "Unless otherwise stated, site branding and original content are owned by or used with permission by Yardley Crest Solutions LLC."],
        ["External services", "The site links to third-party services, including GitHub. Yardley Crest is not responsible for third-party content, availability, or practices."],
        ["Acceptable use", "Do not attempt to disrupt the site, misuse public channels, impersonate the company, or submit unlawful or harmful content."],
      ],
    },
  ];

  policies.forEach((policy) => {
    writePage(
      policy.route,
      layout({
        title: policy.title,
        description: policy.intro,
        eyebrow: "Site information",
        heading: policy.title,
        intro: policy.intro,
        breadcrumbs: [[policy.route, policy.title]],
        content: `<section><article class="container prose">${policy.sections
          .map(([heading, body]) => `<h2>${heading}</h2><p>${body}</p>`)
          .join("")}<p><em>Last updated July 30, 2026.</em></p></article></section>`
      })
    );
  });
}

function build404() {
  const html = layout({
    title: "Page Not Found",
    description: "The requested Yardley Crest Solutions page could not be found.",
    eyebrow: "404",
    heading: "That page is not available.",
    intro: "The address may be incorrect, or the page may have moved.",
    breadcrumbs: [["/", "Page not found"]],
    content: `<section><div class="container narrow"><div class="cta"><h2>Return to the main site</h2><p>Use the homepage to continue exploring Yardley Crest Solutions.</p><a class="button" href="/">Go to homepage</a></div></div></section>`
  });
  fs.writeFileSync(path.join(root, "404.html"), html);
  generatedCount += 1;
}

buildServices();
buildIndustries();
buildWork();
buildInsights();
buildCompanyPages();
buildPolicyPages();
build404();

console.log(`Generated ${generatedCount} subpages.`);
