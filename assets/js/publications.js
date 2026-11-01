(function () {
  const data = window.NEXUS_DATA;
  const list = document.getElementById("pub-list");

  if (!list || !data || !Array.isArray(data.publications)) return;

  const publications = data.publications;
  const search = document.getElementById("pub-search");
  const count = document.getElementById("pub-count");
  const reset = document.getElementById("reset-filters");
  const summary = document.getElementById("active-filter-summary");

  const selectedAreas = new Set();
  const selectedTopics = new Set();
  const selectedTypes = new Set();

  const normalize = (value) => String(value || "").trim().toLowerCase();

  function valuesFor(publication, pluralField, singularField) {
    if (Array.isArray(publication[pluralField])) return publication[pluralField];
    if (publication[singularField]) return [publication[singularField]];
    return [];
  }

  function getPublicationType(publication) {
    const type = String(publication.type || "").trim();
    return type || "Publication";
  }

  function makeCounts(getValues) {
    const counts = new Map();

    publications.forEach((publication) => {
      getValues(publication).forEach((value) => {
        if (!value) return;
        counts.set(value, (counts.get(value) || 0) + 1);
      });
    });

    return counts;
  }

  const areaCounts = makeCounts((p) => valuesFor(p, "areas", "area"));
  const topicCounts = makeCounts((p) => valuesFor(p, "topics", "topic"));
  const typeCounts = makeCounts((p) => [getPublicationType(p)]);

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
    const find = document.getElementById(config.find);
    const listBox = document.getElementById(config.list);
    const meta = document.getElementById(config.meta);
    const clear = document.getElementById(config.clear);
    const done = document.getElementById(config.done);
    const close = document.getElementById(config.close);

    if (!trigger || !triggerValue || !panel || !find || !listBox ||
        !meta || !clear || !done || !close) return null;

    function closePanel() {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    function openPanel() {
      closeAllPanels(panel);
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      find.focus();
    }

    function renderOptions() {
      const needle = normalize(find.value);

      const values = [...config.counts.keys()]
        .filter((value) => normalize(value).includes(needle))
        .sort((a, b) => a.localeCompare(b));

      listBox.innerHTML = values.length
        ? values.map((value) => {
            const active = config.selected.has(value);
            return `
              <button
                class="filter-option ${active ? "active" : ""}"
                type="button"
                data-filter-value="${String(value).replace(/"/g, "&quot;")}"
                aria-pressed="${active}"
              >
                <span class="filter-check">${active ? "✓" : ""}</span>
                <span class="filter-option-name">${value}</span>
                <span class="filter-option-count">${config.counts.get(value)}</span>
              </button>
            `;
          }).join("")
        : '<div class="filter-empty">No matching options.</div>';

      listBox.querySelectorAll("[data-filter-value]").forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.dataset.filterValue;
          config.selected.has(value)
            ? config.selected.delete(value)
            : config.selected.add(value);

          renderOptions();
          updateTrigger();
          render();
        });
      });
    }

    function updateTrigger() {
      const n = config.selected.size;
      triggerValue.textContent =
        n === 0 ? config.allLabel :
        n === 1 ? [...config.selected][0] :
        `${n} selected`;

      meta.textContent =
        `${config.counts.size} ${config.metaLabel} · match any selected ${config.singular}`;
    }

    function resetDropdown() {
      find.value = "";
      config.selected.clear();
      renderOptions();
      updateTrigger();
      closePanel();
    }

    trigger.addEventListener("click", () => {
      panel.hidden ? openPanel() : closePanel();
    });
    find.addEventListener("input", renderOptions);
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

    return { panel, closePanel, resetDropdown };
  }

  [
    {
      trigger: "area-trigger", triggerValue: "area-trigger-value",
      panel: "area-panel", find: "area-find", list: "area-list",
      meta: "area-meta", clear: "area-clear", done: "area-done",
      close: "area-close", counts: areaCounts, selected: selectedAreas,
      allLabel: "All research areas", metaLabel: "research areas", singular: "area"
    },
    {
      trigger: "topic-trigger", triggerValue: "topic-trigger-value",
      panel: "topic-panel", find: "topic-find", list: "topic-list",
      meta: "topic-meta", clear: "topic-clear", done: "topic-done",
      close: "topic-close", counts: topicCounts, selected: selectedTopics,
      allLabel: "All topics", metaLabel: "topics", singular: "topic"
    },
    {
      trigger: "type-trigger", triggerValue: "type-trigger-value",
      panel: "type-panel", find: "type-find", list: "type-list",
      meta: "type-meta", clear: "type-clear", done: "type-done",
      close: "type-close", counts: typeCounts, selected: selectedTypes,
      allLabel: "All publication types", metaLabel: "publication types", singular: "type"
    }
  ].forEach((config) => {
    const dropdown = createDropdown(config);
    if (dropdown) dropdowns.push(dropdown);
  });

  function matchesAny(values, selected) {
    if (selected.size === 0) return true;
    const set = new Set(values);
    return [...selected].some((value) => set.has(value));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function resourceLinks(publication, index) {
    const links = [];

    if (publication.paper) {
      links.push(`<a class="pub-action" href="${publication.paper}" target="_blank" rel="noopener">Paper</a>`);
    }
    if (publication.data) {
      links.push(`<a class="pub-action" href="${publication.data}" target="_blank" rel="noopener">Data</a>`);
    }
    if (publication.repo) {
      links.push(`<a class="pub-action" href="${publication.repo}" target="_blank" rel="noopener">Repo</a>`);
    }
    if (publication.citation) {
      links.push(
        `<button class="pub-action pub-citation-toggle" type="button" data-citation-target="citation-${index}" aria-expanded="false">Citation</button>`
      );
    }

    return links.length
      ? `<div class="pub-actions">${links.join("")}</div>`
      : "";
  }

  function citationPanel(publication, index) {
    if (!publication.citation) return "";

    return `
      <div class="pub-citation-panel" id="citation-${index}" hidden>
        <div class="pub-citation-head">
          <span>BibTeX</span>
          <button class="pub-copy-citation" type="button" data-copy-citation="citation-code-${index}">Copy</button>
        </div>
        <pre id="citation-code-${index}"><code>${escapeHtml(publication.citation)}</code></pre>
      </div>
    `;
  }

  function renderPublication(publication, index) {
    const type = getPublicationType(publication);

    return `
      <article class="pub">
        <div class="pub-side-meta">
          <div class="pub-year">${publication.year}</div>
          <div class="pub-type-label">[${type}]</div>
        </div>
        <div class="pub-body">
          <h2>${publication.title}</h2>
          <p class="authors">${publication.authors}</p>
          <p class="venue">${publication.venue}</p>
          ${publication.award ? `<span class="award">${publication.award}</span>` : ""}
          ${resourceLinks(publication, index)}
          ${citationPanel(publication, index)}
        </div>
      </article>
    `;
  }

  function bindPublicationActions() {
    list.querySelectorAll(".pub-citation-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = document.getElementById(button.dataset.citationTarget);
        if (!panel) return;
        const willOpen = panel.hidden;
        panel.hidden = !willOpen;
        button.setAttribute("aria-expanded", String(willOpen));
      });
    });

    list.querySelectorAll("[data-copy-citation]").forEach((button) => {
      button.addEventListener("click", async () => {
        const target = document.getElementById(button.dataset.copyCitation);
        if (!target) return;

        try {
          await navigator.clipboard.writeText(target.textContent);
          const oldText = button.textContent;
          button.textContent = "Copied";
          setTimeout(() => { button.textContent = oldText; }, 1200);
        } catch (error) {
          button.textContent = "Select text";
        }
      });
    });
  }

  function render() {
    const needle = normalize(search ? search.value : "");

    const filtered = publications.filter((publication) => {
      const areas = valuesFor(publication, "areas", "area");
      const topics = valuesFor(publication, "topics", "topic");
      const type = getPublicationType(publication);

      const searchable = [
        publication.title,
        publication.authors,
        publication.venue,
        type,
        ...areas,
        ...topics
      ].join(" ").toLowerCase();

      return (
        (!needle || searchable.includes(needle)) &&
        matchesAny(areas, selectedAreas) &&
        matchesAny(topics, selectedTopics) &&
        (selectedTypes.size === 0 || selectedTypes.has(type))
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      const yearDiff = (Number(b.year) || 0) - (Number(a.year) || 0);
      if (yearDiff !== 0) return yearDiff;
      return publications.indexOf(a) - publications.indexOf(b);
    });

    if (count) {
      count.textContent = `${sorted.length} publication${sorted.length === 1 ? "" : "s"}`;
    }

    list.innerHTML = sorted.length
      ? sorted.map((publication, index) => renderPublication(publication, index)).join("")
      : '<div class="empty">No publications match the current filters.</div>';

    bindPublicationActions();

    const hasKeyword = needle.length > 0;
    const hasFilters =
      hasKeyword ||
      selectedAreas.size > 0 ||
      selectedTopics.size > 0 ||
      selectedTypes.size > 0;

    if (reset) reset.disabled = !hasFilters;

    if (summary) {
      const parts = [];
      if (hasKeyword) parts.push(`keyword: “${search.value.trim()}”`);
      if (selectedAreas.size) parts.push(`${selectedAreas.size} research area${selectedAreas.size === 1 ? "" : "s"}`);
      if (selectedTopics.size) parts.push(`${selectedTopics.size} topic${selectedTopics.size === 1 ? "" : "s"}`);
      if (selectedTypes.size) parts.push(`${selectedTypes.size} publication type${selectedTypes.size === 1 ? "" : "s"}`);

      summary.innerHTML = hasFilters
        ? `<strong>Active filters:</strong> ${parts.join(" · ")}`
        : "";
    }
  }

  if (search) search.addEventListener("input", render);

  if (reset) {
    reset.addEventListener("click", () => {
      if (search) search.value = "";
      dropdowns.forEach((dropdown) => dropdown.resetDropdown());
      render();
    });
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".filter-dropdown")) closeAllPanels();
  });

  render();
})();
