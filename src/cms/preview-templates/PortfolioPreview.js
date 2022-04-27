import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioPostTemplate } from '../../templates/portfolio-project'

const PortfolioPreview = ({ entry, widgetFor }) => {
  const projtags = entry.getIn(['data', 'projtags'])
  return (
    <PortfolioPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      projtags={projtags && projtags.toJS()}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

PortfolioPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PortfolioPreview
