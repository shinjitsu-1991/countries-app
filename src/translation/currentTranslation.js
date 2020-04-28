import { lang } from "./translations";

export default function getCurrentTranslation(currentLang) {
    return lang.filter((item) => item["lang"] === currentLang)
}