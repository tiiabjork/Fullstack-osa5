let token = null

const blogs = [
  {
    id: "5a945db7119bf36eaa9a0801",
    title: "Lumilautailu",
    author: "Joku",
    url: "www.jee.fi",
    likes: 22,
    userId: {
      _id: "5a945ac6c53a026de4f20d91",
      username: "joppo",
      name: "joppo mikkola"
    }
  },
  {
    id: "5a9460d5119bf36eaa9a0802",
    title: "Ruokablogi",
    author: "Tiia the Best",
    url: "www.tiianruokablogi.fi",
    likes: 1006,
    userId: {
      _id: "5a945ac6c53a026de4f20d91",
      username: "joppo",
      name: "joppo mikkola"
    }
  },
  {
    id: "5a9852f1204d1105396229cb",
    title: "Omena",
    author: "12345678",
    url: "www.jou.fi",
    likes: 2,
    userId: {
      _id: "5a945ac6c53a026de4f20d91",
      username: "joppo",
      name: "joppo mikkola"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }
