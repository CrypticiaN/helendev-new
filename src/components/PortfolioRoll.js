import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class PortfolioRollTemplate extends React.Component {
  render() {
    const { data } = this.props
    const { edges: projects } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {projects &&
          projects.map(({ node: project }) => (
            <div className="is-parent column is-6" key={project.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  project.frontmatter.featuredproject ? 'is-featured' : ''
                }`}
              >
                <header>
                  {project.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: project.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${project.frontmatter.title}`,
                          width:
                            project.frontmatter.featuredimage.childImageSharp
                              .gatsbyImageData.width,
                          height:
                            project.frontmatter.featuredimage.childImageSharp
                              .gatsbyImageData.height,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={project.fields.slug}
                    >
                      {project.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {project.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {project.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={project.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

PortfolioRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function PortfolioRoll() {
  return (
    <StaticQuery
      query={graphql`
        query PortfolioRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "portfolio-project" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredproject
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <PortfolioRollTemplate data={data} count={count} />}
    />
  );
}
