import {default as lume} from "lume/mod.ts";
import {default as jsx} from "lume/plugins/jsx.ts"
import {default as feed} from "lume/plugins/feed.ts"
import fileData from "./_plugins/fileData.ts"
import Site from "lume/core/site.ts";


const site: Site = lume({
	prettyUrls: false,
	location: new URL(""),  // TODO: Enter the base URL of your website here, or links won't work!
})

site.use(jsx({}))

site.copy("_static")

site.data("styles", ["/_static/styles/base.css"])
site.data("lang", "en")
site.data("date", "Git Created")

site.data("layout", "index.tsx", "/index.md")
site.data("tags", ["index"], "/index.md")


site.data("url", "/games/index.html", "/list-games.md")
site.data("layout", "list-games.tsx", "/list-games.md")
site.data("tags", ["list", "list-games"], "/list-games.md")

site.data("layout", "game.tsx", "/games")
site.data("tags", ["review", "game"], "/games")

site.use(fileData({
	query: "index",
	urlizer(data) {
		return data.url.replace(".html", ".json")
	},
	contentizer(data) {
		return JSON.stringify({
			title: data.title,
			subtitle: data.subtitle,
			lists: site.search.pages("list").map((data) => data.url.replace(".html", ".json"))
		})
	}
}))

site.use(fileData({
	query: "list-games",
	urlizer(_data) {
		return "/games/index.json"
	},
	contentizer(data) {
		return JSON.stringify({
			content: data.content,
			items: site.search.pages("game").map((data) => data.url.replace(".html", ".json"))
		})
	}
}))

site.use(fileData({
	query: "game",
	urlizer(data) {
		return data.url.replace(".html", ".json")
	},
	contentizer(data) {
		return JSON.stringify({
			name: data.name ?? null,
			name_sort: data.name_sort ?? null,
			rating: data.rating ?? null,
			content: data.content ?? null,
			active: data.active ?? null,
			progress: data.progress ?? null,
			hours_played: data.hours_played ?? null,
			purchased_on: data.purchased_on ?? null,
			started_on: data.started_on ?? null,
			beaten_on: data.beaten_on ?? null,
			completed_on: data.completed_on ?? null,
			mastered_on: data.mastered_on ?? null,
			identifiers: data.identifiers ?? null,
		})
	}
}))

site.use(feed({
	output: ["/games/feed.rss", "/games/feed.json"],
	query: "game",
	limit: 10,
	info: {
		title: "Videogames",  // TODO: Change this to your site's videogame section's name!
	},
	items: {
		title: "=name"
	}
}))


site.data("url", "/anime/index.html", "/list-anime.md")
site.data("layout", "list-anime.tsx", "/list-anime.md")
site.data("tags", ["list", "list-anime"], "/list-anime.md")

site.data("layout", "anime.tsx", "/anime")
site.data("tags", ["review", "anime"], "/anime")

site.use(fileData({
	query: "list-anime",
	urlizer(_data) {
		return "/anime/index.json"
	},
	contentizer(data) {
		return JSON.stringify({
			content: data.content,
			items: site.search.pages("anime").map((data) => data.url.replace(".html", ".json"))
		})
	}
}))

site.use(fileData({
	query: "anime",
	urlizer(data) {
		return data.url.replace(".html", ".json")
	},
	contentizer(data) {
		return JSON.stringify({
			name: data.name ?? null,
			name_sort: data.name_sort ?? null,
			name_original: data.name_original ?? null,
			rating: data.rating ?? null,
			content: data.content ?? null,
			active: data.active ?? null,
			progress: data.progress ?? null,
			started_on: data.started_on ?? null,
			completed_on: data.completed_on ?? null,
			mastered_on: data.mastered_on ?? null,
			identifiers: data.identifiers ?? null,
		})
	}
}))

site.use(feed({
	output: ["/anime/feed.rss", "/anime/feed.json"],
	query: "anime",
	limit: 10,
	info: {
		title: "Anime",  // TODO: Change this to your site's anime section's name!
	},
	items: {
		title: "=name"
	}
}))


export default site;
