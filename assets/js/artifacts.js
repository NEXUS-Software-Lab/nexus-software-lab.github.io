(function () {
  const grid = document.getElementById("artifact-grid");
  if (!grid || !window.NEXUS_DATA || !Array.isArray(NEXUS_DATA.artifacts)) return;

  const sourceArtifacts = [...NEXUS_DATA.artifacts];

  // Fallback: keep SecAIDev visible even if an older cached data.js is served.
  if (!sourceArtifacts.some((item) => item.id === "secaidev")) {
    sourceArtifacts.unshift({
      id: "secaidev",
      title: "SecAIDev",
      type: "Tool",
      year: 2026,
      authors: "Gurjas Chalana and Karim Elish",
      description:
        "Security-assurance workbench for screening agent-authored pull requests across security exposure, potential security risk, mitigation evidence, and potential false assurance.",
      areas: [
        "Software Security & Privacy",
        "Trustworthy AI",
        "AI-Assisted Software Engineering",
        "Software Analysis & Analytics",
        "Empirical Software Engineering"
      ],
      topics: [
        "AI Agents",
        "Agent-Authored Pull Requests",
        "AI-Assisted Software Engineering",
        "Security Assurance",
        "False Assurance",
        "Code Review",
        "Software Security",
        "Empirical Study"
      ],
      demo: "https://agent-pr-dashboard.vercel.app/",
      repo: "https://github.com/GurjasChalana/Agent-PR-Dashboard"
    });
  }

  const all = sourceArtifacts.sort(
    (a, b) => (b.year - a.year) || a.title.localeCompare(b.title)
  );

  const search = document.getElementById("artifact-search");
  const count = document.getElementById("artifact-count");
  const reset = document.getElementById("artifact-reset-filters");
  const activeSummary = document.getElementById("artifact-active-filter");

  document.getElementById("artifact-total").textContent = all.length;
  document.getElementById("artifact-datasets").textContent =
    all.filter((x) => x.type === "Dataset").length;
  document.getElementById("artifact-tools").textContent =
    all.filter((x) => x.type === "Tool").length;

  const selectedTypes = new Set();
  const selectedAreas = new Set();
  const selectedTopics = new Set();

  const researchAreaOrder = [
    "Software Security & Privacy",
    "Malware & Vulnerability Analysis",
    "Mobile & Android Security",
    "Trustworthy AI",
    "AI-Assisted Software Engineering",
    "Software Analysis & Analytics",
    "Software Quality & Metrics",
    "Empirical Software Engineering"
  ];

  const normalize = (value) => String(value || "").trim().toLowerCase();

  function valuesFor(item, field) {
    const value = item[field];
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }

  function makeCounts(field) {
    const counts = new Map();

    all.forEach((item) => {
      valuesFor(item, field).forEach((value) => {
        counts.set(value, (counts.get(value) || 0) + 1);
      });
    });

    return counts;
  }

  const typeCounts = makeCounts("type");
  const areaCounts = makeCounts("areas");
  const topicCounts = makeCounts("topics");

  const dropdowns = [];

  function closeAllPanels(exceptPanel) {
    dropdowns.forEach((dropdown) => {
      if (dropdown.panel !== exceptPanel) dropdown.closePanel();
    });
  }

  function createDropdown(config) {
    const trigger = document.getElementById(config.trigger);
    const triggerValue = document.getElementById(config.triggerValue);
    const panel = document.getElementById(config.panel);
    const listBox = document.getElementById(config.list);
    const meta = document.getElementById(config.meta);
    const clear = document.getElementById(config.clear);
    const done = document.getElementById(config.done);
    const close = document.getElementById(config.close);
    const find = config.find ? document.getElementById(config.find) : null;

    function closePanel() {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    function openPanel() {
      closeAllPanels(panel);
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      if (find) find.focus();
    }

    function orderedValues() {
      const values = [...config.counts.keys()];
      if (config.order) {
        return config.order.filter((value) => config.counts.has(value));
      }

      if (config.sortByCount) {
        return values.sort((a, b) => {
          const countDiff = config.counts.get(b) - config.counts.get(a);
          return countDiff || a.localeCompare(b);
        });
      }

      return values.sort((a, b) => a.localeCompare(b));
    }

    function renderOptions() {
      const needle = find ? normalize(find.value) : "";
      const values = orderedValues().filter((value) =>
        normalize(value).includes(needle)
      );

      listBox.innerHTML = values.length
        ? values.map((value) => {
            const active = config.selected.has(value);
            return `
              <button
                class="artifact-filter-option ${active ? "active" : ""}"
                type="button"
                data-filter-value="${value.replace(/"/g, "&quot;")}"
                aria-pressed="${active}"
              >
                <span class="artifact-filter-check">${active ? "✓" : ""}</span>
                <span class="artifact-filter-option-name">${value}</span>
                <span class="artifact-filter-option-count">${config.counts.get(value)}</span>
              </button>
            `;
          }).join("")
        : '<div class="artifact-filter-empty">No matching options.</div>';

      listBox.querySelectorAll("[data-filter-value]").forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.dataset.filterValue;

          if (config.selected.has(value)) {
            config.selected.delete(value);
          } else {
            config.selected.add(value);
          }

          renderOptions();
          updateTrigger();
          render();
        });
      });
    }

    function updateTrigger() {
      const numberSelected = config.selected.size;

      triggerValue.textContent =
        numberSelected === 0
          ? config.allLabel
          : numberSelected === 1
            ? [...config.selected][0]
            : `${numberSelected} selected`;

      meta.textContent =
        `${config.counts.size} ${config.metaLabel} · match any selected ${config.singular}`;
    }

    function resetDropdown() {
      if (find) find.value = "";
      config.selected.clear();
      renderOptions();
      updateTrigger();
    }

    trigger.addEventListener("click", () => {
      panel.hidden ? openPanel() : closePanel();
    });

    if (find) {
      find.addEventListener("input", renderOptions);
    }

    clear.addEventListener("click", () => {
      config.selected.clear();
      renderOptions();
      updateTrigger();
      render();
    });

    done.addEventListener("click", closePanel);
    close.addEventListener("click", closePanel);

    renderOptions();
    updateTrigger();

    return {
      panel,
      closePanel,
      resetDropdown
    };
  }

  dropdowns.push(
    createDropdown({
      trigger: "type-trigger",
      triggerValue: "type-trigger-value",
      panel: "type-panel",
      list: "type-list",
      meta: "type-meta",
      clear: "type-clear",
      done: "type-done",
      close: "type-close",
      counts: typeCounts,
      selected: selectedTypes,
      allLabel: "All types",
      metaLabel: "artifact types",
      singular: "type",
      order: ["Dataset", "Tool", "Benchmark"]
    })
  );

  dropdowns.push(
    createDropdown({
      trigger: "area-trigger",
      triggerValue: "area-trigger-value",
      panel: "area-panel",
      find: "area-find",
      list: "area-list",
      meta: "area-meta",
      clear: "area-clear",
      done: "area-done",
      close: "area-close",
      counts: areaCounts,
      selected: selectedAreas,
      allLabel: "All research areas",
      metaLabel: "research areas",
      singular: "area",
      order: researchAreaOrder
    })
  );

  dropdowns.push(
    createDropdown({
      trigger: "topic-trigger",
      triggerValue: "topic-trigger-value",
      panel: "topic-panel",
      find: "topic-find",
      list: "topic-list",
      meta: "topic-meta",
      clear: "topic-clear",
      done: "topic-done",
      close: "topic-close",
      counts: topicCounts,
      selected: selectedTopics,
      allLabel: "All topics",
      metaLabel: "topics",
      singular: "topic",
      sortByCount: true
    })
  );

  function matchesAny(values, selected) {
    if (selected.size === 0) return true;
    const set = new Set(Array.isArray(values) ? values : [values].filter(Boolean));
    return [...selected].some((value) => set.has(value));
  }

  function datasetFallback() {
    return `
      <svg class="artifact-fallback-icon" viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="14" rx="18" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <path d="M14 14v12c0 3.9 8.1 7 18 7s18-3.1 18-7V14" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <path d="M14 26v12c0 3.9 8.1 7 18 7s18-3.1 18-7V26" fill="none" stroke="currentColor" stroke-width="2.5"/>
        <path d="M14 38v12c0 3.9 8.1 7 18 7s18-3.1 18-7V38" fill="none" stroke="currentColor" stroke-width="2.5"/>
      </svg>
    `;
  }

  function toolFallback() {
    return `
      <svg class="artifact-fallback-icon" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 7 49 13v14c0 13-7 23-17 29-10-6-17-16-17-29V13L32 7Z"
              fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="m25 27-6 5 6 5M39 27l6 5-6 5M35 23l-6 18"
              fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  function renderVisual(item) {
    const fallback = item.type === "Tool" ? toolFallback() : datasetFallback();

    if (!item.image) {
      return `<div class="artifact-visual">${fallback}</div>`;
    }

    return `
      <div class="artifact-visual">
        <img
          src="${item.image}"
          alt="${item.title} logo"
          onerror="
            this.style.display='none';
            this.nextElementSibling.style.display='block';
          "
        >
        <span style="display:none">${fallback}</span>
      </div>
    `;
  }

  function renderActions(item) {
    const links = [];

    if (item.paper) {
      links.push(`<a class="mini-link" href="${item.paper}" target="_blank" rel="noopener">Paper</a>`);
    }

    if (item.data) {
      links.push(`<a class="mini-link" href="${item.data}" target="_blank" rel="noopener">Data</a>`);
    }

    if (item.demo) {
      links.push(`<a class="mini-link" href="${item.demo}" target="_blank" rel="noopener">Live tool</a>`);
    }

    if (item.repo) {
      links.push(`<a class="mini-link" href="${item.repo}" target="_blank" rel="noopener">Repository</a>`);
    }

    return links.join("");
  }

  function render() {
    const needle = normalize(search.value);

    const items = all.filter((item) => {
      const searchable = [
        item.title,
        item.authors,
        item.description,
        item.type,
        ...(item.areas || []),
        ...(item.topics || [])
      ].join(" ").toLowerCase();

      const matchesKeyword = !needle || searchable.includes(needle);
      const matchesType = matchesAny(item.type, selectedTypes);
      const matchesArea = matchesAny(item.areas, selectedAreas);
      const matchesTopic = matchesAny(item.topics, selectedTopics);

      return matchesKeyword && matchesType && matchesArea && matchesTopic;
    });

    count.textContent =
      `${items.length} artifact${items.length === 1 ? "" : "s"}`;

    if (!items.length) {
      grid.innerHTML =
        '<div class="empty" style="grid-column:1/-1">No artifacts match the current filters.</div>';
    } else {
      grid.innerHTML = items.map((item) => `
        <article class="artifact" id="${item.id}">
          <div class="artifact-top">
            <div>
              <div class="artifact-type">${item.type} · ${item.year}</div>
              <h2>${item.title}</h2>
            </div>
            ${renderVisual(item)}
          </div>

          <div class="authors">${item.authors}</div>
          <p>${item.description}</p>

          <div class="card-actions">
            ${renderActions(item)}
          </div>
        </article>
      `).join("");
    }

    const keywordActive = normalize(search.value).length > 0;
    const hasFilters =
      keywordActive ||
      selectedTypes.size > 0 ||
      selectedAreas.size > 0 ||
      selectedTopics.size > 0;

    reset.disabled = !hasFilters;

    const parts = [];
    if (keywordActive) parts.push(`keyword: “${search.value.trim()}”`);
    if (selectedTypes.size) parts.push(`${selectedTypes.size} type${selectedTypes.size === 1 ? "" : "s"}`);
    if (selectedAreas.size) parts.push(`${selectedAreas.size} research area${selectedAreas.size === 1 ? "" : "s"}`);
    if (selectedTopics.size) parts.push(`${selectedTopics.size} topic${selectedTopics.size === 1 ? "" : "s"}`);

    activeSummary.innerHTML = hasFilters
      ? `<strong>Active filters:</strong> ${parts.join(" · ")}`
      : "";
  }

  search.addEventListener("input", render);

  reset.addEventListener("click", () => {
    search.value = "";
    dropdowns.forEach((dropdown) => dropdown.resetDropdown());
    closeAllPanels();
    render();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".artifact-filter-dropdown")) {
      closeAllPanels();
    }
  });

  render();
})();
