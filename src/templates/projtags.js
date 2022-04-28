import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

class ProjTagRoute extends React.Component {
  render() {
    const projects = this.props.data.allMarkdownRemark.edges;
    const projectLinks = projects.map((project) => (
      <li key={project.node.fields.slug}>
        <Link to={project.node.fields.slug}>
          <h2 className="is-size-2">{project.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
    const projtag = this.props.pageContext.projtag;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const projtagHeader = `${totalCount} project${
      totalCount === 1 ? "" : "s"
    } tagged with “${projtag}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${projtag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="title is-size-4 is-bold-light">{projtagHeader}</h3>
                <ul className="taglist">{projectLinks}</ul>
                <p>
                  <Link to="/projtags/">Browse all tags</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default ProjTagRoute;

export const projTagPageQuery = graphql`
  query ProjTagPage($projtag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { projtags: { in: [$projtag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
