import {Page} from "lume/core/file.ts"
import Site from "lume/core/site.ts";

export type FileDataOptions = {
    query: string,
    urlizer: (data: Lume.Data) => string,
    contentizer: (data: Lume.Data) => string,
}

export default function fileData({query, urlizer, contentizer}: FileDataOptions) {
    return (site: Site) => {
        site.addEventListener("beforeSave", () => {
            const datas: Lume.Data[] = site.search.pages(query)
            for(const data of datas) {
                site.pages.push(Page.create({
                    url: urlizer(data),
                    content: contentizer(data),
                }))
            }
        })
    }
}