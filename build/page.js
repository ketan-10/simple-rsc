// app/page.jsx
import { Suspense } from "react";

// data/bjork-post.json
var bjork_post_default = {
  id: "bjork-post",
  artist: "Bj\xF6rk",
  title: "Post",
  cover: "https://i.discogs.com/nKIGMO-FhgjIZAxpTKIx__vLsrg6XTEUEbeMXtgnJMs/rs:fit/g:sm/q:90/h:581/w:588/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMjQ4/MS0xMjMyMTQ2Nzgy/LmpwZWc.jpeg",
  songs: [
    {
      title: "Army of Me",
      duration: "4:00"
    },
    {
      title: "Hyperballad",
      duration: "5:21"
    },
    {
      title: "The Modern Things",
      duration: "4:00"
    },
    {
      title: "It's Oh So Quiet",
      duration: "4:00"
    },
    {
      title: "Enjoy",
      duration: "4:00"
    },
    {
      title: "You've Been Flirting Again",
      duration: "4:00"
    },
    {
      title: "Isobel",
      duration: "4:00"
    },
    {
      title: "Possibly Maybe",
      duration: "4:00"
    },
    {
      title: "I Miss You",
      duration: "4:00"
    },
    {
      title: "Cover Me",
      duration: "4:00"
    },
    {
      title: "Headphones",
      duration: "4:00"
    }
  ]
};

// data/lady-gaga-the-fame.json
var lady_gaga_the_fame_default = {
  id: "lady-gaga-the-fame",
  artist: "Lady Gaga",
  title: "The Fame",
  cover: "https://i.discogs.com/0MgbgSVEqOrRtLwARinYwVPQHVqIq-pR0csL19pdmTg/rs:fit/g:sm/q:90/h:396/w:400/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MzI5/OTEtMTIxOTI4Njg0/MS5qcGVn.jpeg",
  songs: [
    {
      title: "Just Dance",
      duration: "4:01"
    },
    {
      title: "LoveGame",
      duration: "3:48"
    },
    {
      title: "Paparazzi",
      duration: "3:48"
    },
    {
      title: "Poker Face",
      duration: "3:58"
    },
    {
      title: "Eh, Eh (Nothing Else I Can Say)",
      duration: "3:47"
    },
    {
      title: "Beautiful, Dirty, Rich",
      duration: "3:47"
    },
    {
      title: "The Fame",
      duration: "3:47"
    },
    {
      title: "Money Honey",
      duration: "3:47"
    },
    {
      title: "Starstruck",
      duration: "3:47"
    },
    {
      title: "Boys Boys Boys",
      duration: "3:47"
    },
    {
      title: "Paper Gangsta",
      duration: "3:47"
    },
    {
      title: "Brown Eyes",
      duration: "3:47"
    },
    {
      title: "I Like It Rough",
      duration: "3:47"
    },
    {
      title: "Summerboy",
      duration: "3:47"
    },
    {
      title: "Disco Heaven",
      duration: "3:47"
    }
  ]
};

// data/glass-animals-how-to-be.json
var glass_animals_how_to_be_default = {
  id: "glass-animals-how-to-be",
  title: "How To Be A Human Being",
  artist: "Glass Animals",
  cover: "https://i.discogs.com/H-kC9IIS7dglokcAXmfrRHji0roeA3SMxrNFr9MtBzQ/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg5NTM0/NzAtMTQ3MjE0NTUx/My03NjA2LmpwZWc.jpeg",
  songs: [
    {
      title: "Life Itself",
      duration: "4:41"
    },
    {
      title: "Youth",
      duration: "3:50"
    },
    {
      title: "Season 2 Episode 3",
      duration: "3:52"
    },
    {
      title: "Pork Soda",
      duration: "4:13"
    },
    {
      title: "Mama's Gun",
      duration: "3:52"
    },
    {
      title: "Cane Shuga",
      duration: "3:52"
    },
    {
      title: "[Premade Sandwiches]",
      duration: "0:36"
    },
    {
      title: "The Other Side Of Paradise",
      duration: "3:52"
    },
    {
      title: "Take A Slice",
      duration: "3:52"
    },
    {
      title: "Poplar St",
      duration: "3:52"
    },
    {
      title: "Agnes",
      duration: "3:52"
    }
  ]
};

// data/db.js
var albums = [bjork_post_default, lady_gaga_the_fame_default, glass_animals_how_to_be_default];
var artificialWait = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));
async function getAll() {
  await artificialWait();
  return albums;
}

// app/page.jsx
import Like from "./Like.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
async function Albums() {
  const albums2 = await getAll();
  return /* @__PURE__ */ jsx("ul", { children: albums2.map((a) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2 items-center mb-2", children: [
    /* @__PURE__ */ jsx("img", { className: "w-20 aspect-square", src: a.cover, alt: a.title }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl", children: a.title }),
      /* @__PURE__ */ jsxs("p", { children: [
        a.songs.length,
        " songs"
      ] }),
      /* @__PURE__ */ jsx(Like, {})
    ] })
  ] }, a.id)) });
}
async function Page() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-3", children: "Spotifn\u2019t" }),
    /* @__PURE__ */ jsx(Suspense, { fallback: "Getting albums", children: /* @__PURE__ */ jsx(Albums, {}) })
  ] });
}
export {
  Page as default
};
