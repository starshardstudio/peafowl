export default function(data: Lume.Data, helpers: Lume.Helpers) {
	const charset = (
		<meta charSet={"utf8"}/>
	)

	const viewport = (
		<meta
			name={"viewport"}
			content={"width=device-width, initial-scale=1"}
		/>
	)

	const title = (
		<title children={data.site_title}/>
	)

	const stylesheets = data.styles.map((style: string) => (
		<link
			key={style}
			rel={"stylesheet"}
			href={style}
		/>
	))

	const header = (
		<header>
			<hgroup className={"base-titles"}>
				<a href={helpers.url("/")}>
					<h1>{data.title}</h1>
					<div>{data.subtitle}</div>
				</a>
			</hgroup>
		</header>
	)

	const children = data.children

	// noinspection HtmlRequiredTitleElement
	return (
		<html>
			<head>
				{charset}
				{viewport}
				{title}
				{stylesheets}
			</head>
			<body>
				{header}
				{children}
			</body>
		</html>
	)
}
