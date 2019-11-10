import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allBackquotePost.edges

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          return (
            <React.Fragment>
              <article key={node.slug}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none` }} to={node.slug}>
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
              <nav>
                <ul
                  style={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    justifyContent: `space-between`,
                    listStyle: `none`,
                    padding: 0,
                  }}
                >
                  <li>
                    {!isFirst && (
                      <Link to={prevPage} rel="prev">
                        ← Newer
                      </Link>
                    )}
                  </li>
                  <li>
                    {!isLast && (
                      <Link to={nextPage} rel="next">
                        Older →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </React.Fragment>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndexPage

export const pageQuery = graphql`
  query pageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allBackquotePost(
      sort: { fields: time_created, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          blog_id
          title
          slug
          short_description
          body_compiled
          body_source
          time_created(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
