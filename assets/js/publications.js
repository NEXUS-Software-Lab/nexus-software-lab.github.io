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
    const explicitType = normalize(
      publication.type || publication.kind || publication.publicationType
    );

    if (explicitType.includes("workshop")) return "Workshop";
    if (explicitType.includes("journal")) return "Journal";
    if (explicitType.includes("conference")) return "Conference";

    const venue = normalize(publication.venue);

    if (venue.includes("workshop")) return "Workshop";

    const journalIndicators = [
      "journal",
      "transactions",
      "magazine",
      "ieee software",
      "ieee internet computing",
      "ieee access",
      "computers & security",
      "information,"
    ];

    if (journalIndicators.some((indicator) => venue.includes(indicator))) {
      return "Journal";
    }

    return "Conference";
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

  const areaCounts = makeCounts((publication) =>
    valuesFor(publication, "areas", "area")
  );

  const topicCounts = makeCounts((publication) =>
    valuesFor(publication, "topics", "topic")
  );

  const typeCounts = makeCounts((publication) => [
    getPublicationType(publication)
  ]);

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

    if (
      !trigger || !triggerValue || !panel || !find || !listBox ||
      !meta || !clear || !done || !close
    ) {
      return null;
    }

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

  const dropdownConfigs = [
    {
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
      singular: "area"
    },
    {
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
      singular: "topic"
    },
    {
      trigger: "type-trigger",
      triggerValue: "type-trigger-value",
      panel: "type-panel",
      find: "type-find",
      list: "type-list",
      meta: "type-meta",
      clear: "type-clear",
      done: "type-done",
      close: "type-close",
      counts: typeCounts,
      selected: selectedTypes,
      allLabel: "All publication types",
      metaLabel: "publication types",
      singular: "type"
    }
  ];

  dropdownConfigs.forEach((config) => {
    const dropdown = createDropdown(config);
    if (dropdown) dropdowns.push(dropdown);
  });

  function matchesAny(values, selected) {
    if (selected.size === 0) return true;
    const set = new Set(values);
    return [...selected].some((value) => set.has(value));
  }

  function renderPublication(publication) {
    return `
      <article class="pub pub-grouped">
        <div class="pub-body">
          <h2>${publication.title}</h2>
          <p class="authors">${publication.authors}</p>
          <p class="venue">${publication.venue}</p>
          ${publication.award ? `<span class="award">${publication.award}</span>` : ""}
        </div>
      </article>
    `;
  }

  function render() {
    const needle = normalize(search ? search.value : "");

    const filtered = publications.filter((publication) => {
      const areas = valuesFor(publication, "areas", "area");
      const topics = valuesFor(publication, "topics", "topic");
      const publicationType = getPublicationType(publication);

      const searchable = [
        publication.title,
        publication.authors,
        publication.venue,
        publicationType,
        ...areas,
        ...topics
      ].join(" ").toLowerCase();

      const matchesKeyword = !needle || searchable.includes(needle);
      const matchesAreas = matchesAny(areas, selectedAreas);
      const matchesTopics = matchesAny(topics, selectedTopics);
      const matchesType =
        selectedTypes.size === 0 || selectedTypes.has(publicationType);

      return matchesKeyword && matchesAreas && matchesTopics && matchesType;
    });

    const sorted = [...filtered].sort((a, b) => {
      const yearA = Number.parseInt(a.year, 10) || 0;
      const yearB = Number.parseInt(b.year, 10) || 0;
      return yearB - yearA;
    });

    if (count) {
      count.textContent =
        `${filtered.length} publication${filtered.length === 1 ? "" : "s"}`;
    }

    if (sorted.length) {
      const grouped = new Map();

      sorted.forEach((publication) => {
        const year = publication.year || "Other";
        if (!grouped.has(year)) grouped.set(year, []);
        grouped.get(year).push(publication);
      });

      list.innerHTML = [...grouped.entries()]
        .map(([year, yearPublications]) => `
          <section class="pub-year-group" aria-label="Publications from ${year}">
            <div class="pub-year pub-year-heading">${year}</div>
            <div class="pub-year-items">
              ${yearPublications.map(renderPublication).join("")}
            </div>
          </section>
        `)
        .join("");
    } else {
      list.innerHTML =
        '<div class="empty">No publications match the current filters.</div>';
    }

    const keywordActive = needle.length > 0;
    const hasFilters =
      keywordActive ||
      selectedAreas.size > 0 ||
      selectedTopics.size > 0 ||
      selectedTypes.size > 0;

    if (reset) reset.disabled = !hasFilters;

    if (summary) {
      const parts = [];

      if (keywordActive) {
        parts.push(`keyword: “${search.value.trim()}”`);
      }

      if (selectedAreas.size) {
        parts.push(
          `${selectedAreas.size} research area${selectedAreas.size === 1 ? "" : "s"}`
        );
      }

      if (selectedTopics.size) {
        parts.push(
          `${selectedTopics.size} topic${selectedTopics.size === 1 ? "" : "s"}`
        );
      }

      if (selectedTypes.size) {
        parts.push(
          `${selectedTypes.size} publication type${selectedTypes.size === 1 ? "" : "s"}`
        );
      }

      summary.innerHTML = hasFilters
        ? `<strong>Active filters:</strong> ${parts.join(" · ")}`
        : "";
    }
  }

  if (search) {
    search.addEventListener("input", render);
  }

  if (reset) {
    reset.addEventListener("click", () => {
      if (search) search.value = "";
      dropdowns.forEach((dropdown) => dropdown.resetDropdown());
      render();
    });
  }

  document.addEventListener("click", (event) => {
    const clickedInsideDropdown = event.target.closest(".filter-dropdown");
    if (!clickedInsideDropdown) closeAllPanels();
  });

  render();
})();
