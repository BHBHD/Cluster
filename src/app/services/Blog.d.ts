declare interface Blog {
  id: number
  title: string
  content: string
  author: string
  image?: string
  uid: string
  created_at: string
}

declare interface UpdateBlog {
  id: string
  title: string
  content: string
  image?: string
}

declare interface CreateBlog {
  title: string
  content: string
  author: string
  image?: string
  uid: string
}
