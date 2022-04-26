import * as React from "react";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const ProjTagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`ProjTags | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: "6rem" }}
          >
            <h1 className="title is-size-2 is-bold-light">Project Tags</h1>
            <ul className="taglist">
              {group.map((projtag) => (
                <li key={projtag.fieldValue}>
                  <Link to={`/portfolio/${kebabCase(projtag.fieldValue)}/`}>
                    {projtag.fieldValue} ({projtag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ProjTagsPage;

export const projtagPageQuery = graphql`
  query ProjTagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___projtags) {
        fieldValue
        totalCount
      }
    }
  }
`;
