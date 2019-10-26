import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allBackquotePost.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          return (
            <article key={node.id}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.id}>
                    {node.title}
                  </Link>
                </h3>
                <small>{node.time_created}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.short_description,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allBackquotePost(sort: { fields: time_created, order: DESC }) {
      edges {
        node {
          blog_id
          body_compiled
          body_source
          id
          short_description
          time_created(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`
