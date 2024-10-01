import {gql} from '@apollo/client'

export const GET_CATEGORIES = gql`
  query getCategories {
  categories {
    categoryName
    documentId
  }
}
`

export const GET_POSTS = gql`
query getPosts {
  posts {
    documentId
    postTitle
    postExcerpt
    postContent
    createdAt
    categories{
      documentId
      categoryName
    }
    user {
      documentId
      authorName
      userBio
      userImage {
        url
      }

    }
    categories {
      documentId
      categoryName
    }
    featuredImage {
      url
    }

  }
}
`;

export const GET_POST = gql`
  query Post($documentId: ID!) {
  post(documentId: $documentId) {
    documentId
    postTitle
    postExcerpt
    createdAt
    categories {
      categoryName
  
    }
    featuredImage {
      url
    }
    user {
      authorName
      userBio
      documentId
      userImage {
        url
      }
    }
     postContent
  }
}
`

export const GET_AUTHOR_POSTS = gql`
  query getAuthorPosts($authorId: ID!, $excludeId: ID!) {
    posts(filters: { 
      user: { documentId: { eq: $authorId } }, 
      documentId: { ne: $excludeId }
    }) {
      documentId
      postTitle
      postExcerpt
      createdAt
      featuredImage {
        url
      }
    }
  }
`

export const GET_CATEGORIES_POSTS = gql`
  query Posts($categoryNames: [String!], $excludeId: ID!) {
  posts(filters: { categories: { categoryName: { in: $categoryNames } }, documentId: { ne: $excludeId } }, pagination: { limit: 4 }) {
    documentId
    postTitle
    postExcerpt
    featuredImage{
      url
    }
    categories {
      categoryName
    }
  }
}
`

// export const GET_ALL_POSTS_BY_CATEGORY = gql`
  
// `

export const GET_RECENT_POSTS = gql`
query recentPosts {
  posts(sort: "createdAt:desc", pagination: { limit: 4 }) {
    documentId
    postTitle
    postExcerpt
    featuredImage {
      url
    }
    createdAt
  }
}
`

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!,
    $excerpt: String!,
    $postContent: String!,
    $categories: [ID!],
    $featuredImage: ID!,
    $user: ID!
  ) {
    createPost(data: {
      postTitle: $title,
      postExcerpt: $excerpt,
      postContent: $postContent,
      categories: $categories,
      featuredImage: $featuredImage,
      user: $user
    }) {
      documentId
      postTitle
      postExcerpt
      postContent
      createdAt
      updatedAt
      categories {
        documentId
        categoryName
      }
      featuredImage {
        documentId
        url
        alternativeText
      }
    }
  }
`;




