jQuery(document).ready(function($) {
    function resolveTabId(saved) {
        if (!saved || typeof saved !== 'string') return 'tab1';
        
        saved = saved.trim();
        
        // If saved value is a JSON string (e.g. {"screen":"watermark","expires":...})
        if (saved.startsWith('{') && saved.endsWith('}')) {
            try {
                var parsed = JSON.parse(saved);
                if (parsed.tab) saved = parsed.tab;
                else if (parsed.screen) saved = parsed.screen;
            } catch (e) {
                // If parsing fails, ignore
            }
        }

        // Map named screens or numbers to tab IDs
        var screenMap = {
            '1': 'tab1', 'selection': 'tab1', 'tab1': 'tab1',
            '2': 'tab2', 'rightclick': 'tab2', 'tab2': 'tab2',
            '3': 'tab3', 'css': 'tab3', 'css_protection': 'tab3', 'cssprotection': 'tab3', 'tab3': 'tab3',
            '4': 'tab4', 'overlay': 'tab4', 'overlay_protection': 'tab4', 'overlayprotection': 'tab4', 'tab4': 'tab4',
            '5': 'tab5', 'watermark': 'tab5', 'tab5': 'tab5',
            '6': 'tab6', 'exclusion': 'tab6', 'tab6': 'tab6',
            '7': 'tab7', 'custom': 'tab7', 'custom_settings': 'tab7', 'customsettings': 'tab7', 'tab7': 'tab7',
            '8': 'tab8', 'beta': 'tab8', 'beta_options': 'tab8', 'betaoptions': 'tab8', 'tab8': 'tab8',
            '9': 'tab9', 'contact': 'tab9', 'tab9': 'tab9'
        };

        var key = saved.toLowerCase().replace(/[^a-z0-9_]/g, '');
        if (screenMap[key]) {
            return screenMap[key];
        }

        return 'tab1';
    }

    try {
        var rawTab = localStorage.getItem("wccp_pro_lastTab");
        var targetTabId = resolveTabId(rawTab);
        var targetElem = document.getElementById(targetTabId);

        if (targetElem && targetElem.classList.contains('tab_container_radio_tabs')) {
            $('input.tab_container_radio_tabs').prop('checked', false);
            targetElem.checked = true;
        }
    } catch (e) {
        console.warn('WCCP Pro: Tab restore error', e);
    }

    $('input.tab_container_radio_tabs').on('change', function() {
        if (this.checked) {
            try {
                localStorage.setItem("wccp_pro_lastTab", this.id);
            } catch (e) {
                // Ignore localStorage errors (e.g. quota/privacy mode)
            }
        }
    });
});
