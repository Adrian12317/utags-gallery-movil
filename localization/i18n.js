import * as Localization from "expo-localization";
import i18n from "i18n-js";

import * as enL from "./translations/en.json";
import * as esL from "./translations/es.json";
import * as frL from "./translations/fr.json";
import * as itL from "./translations/it.json";
import * as deL from "./translations/de.json";

i18n.translations = {
    en: enL,
    es: esL,
    fr: frL,
    it:itL,
    de:deL,
}

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;