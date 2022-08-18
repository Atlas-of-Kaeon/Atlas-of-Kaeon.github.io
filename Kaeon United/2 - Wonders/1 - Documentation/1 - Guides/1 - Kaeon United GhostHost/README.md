<h1 align="center">Kaeon United GhostHost</h1>

Kaeon United GhostHost,
or GhostHost for short,
is a utility built into the [Kaeon United](https://github.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/blob/master/Kaeon%20United/2%20-%20Wonders/1%20-%20Documentation/README.md) platform that allows for free and anonymous front end hosting for serverless apps.

<h2 align="center">Functionality</h2>

GhostHost can take a URL to an online text document as a parameter in its own URL.

The provided document may contain HTML,
JavaScript,
or Kaeon FUSION code.

If HTML is provided,
the website shall render said html as a website.

If JavaScript or Kaeon FUSION is provided,
it shall be executed as a script implictly.

If JavaScript is provided,
it shall be interpreted as [United JavaScript](https://github.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/blob/master/Kaeon%20United/2%20-%20Wonders/1%20-%20Documentation/README.md#united-javascript),
and shall thus have access to the CommonJS require function,
through which it may import modules stored online via their URLs.

Additionally,
if desired,
it is also possible to specify raw code in the URL instead of a link.

Resources accessed by GhostHost through its URL and through the United JavaScript require function shall be run through a CORS proxy to allow for cross origin access to them.

<h2 align="center">Instructions</h2>

The URL for an HTML project must follow this format:

    https://Atlas-of-Kaeon.github.io/?html=resource_link

The URL for a JavaScript project must follow this format:

    https://Atlas-of-Kaeon.github.io/?unitedJS=resource_link

The URL for a Kaeon FUSION project must follow this format:

    https://Atlas-of-Kaeon.github.io/?unitedOP=resource_link

The URL for an HTML project using raw code instead of a URL must follow this format:

    https://Atlas-of-Kaeon.github.io/?htmlRaw=resource_code

The URL for a JavaScript project project using raw code instead of a URL must follow this format:

    https://Atlas-of-Kaeon.github.io/?unitedJSRaw=resource_code

The URL for a Kaeon FUSION project using raw code instead of a URL project must follow this format:

    https://Atlas-of-Kaeon.github.io/?unitedOPRaw=resource_code

<h2 align="center">Example</h2>

To demonstrate,
we've uploaded an example site to this repository, located at the following URL:

<a href="https://Atlas-of-Kaeon.github.io/?html=https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20Documentation/2%20-%20Samples/2%20-%20Websites/1%20-%20Sample/Sample.html">https://Atlas-of-Kaeon.github.io/?html=https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/1%20-%20Documentation/2%20-%20Samples/2%20-%20Websites/1%20-%20Sample/Sample.html</a>

<h2 align="center">Why use GhostHost over GitLab pages, or other similar services?</h2>

Other platforms used for free hosting usually require the creation of some sort of account,
require an intermediate knowledge of IT related topics,
making them inaccessible to beginners,
and are contingent upon the resources and good will of whoever is hosting them.
Additionally,
most impose strict limitations on their use.

GhostHost provides the potential for unlimited and anonymous use,
and the technique is simple enough to replicate that,
if GhostHost or other hosting services ever go down or change their policies,
someone else could easily replicate it elsewhere for little to no cost.