import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Sidebar from 'containers/Layout/Sidebar';
import Header from 'containers/Layout/Header';
import Footer from 'containers/Layout/Footer';
import { Row, Column } from 'components/Basic/Style';

const MainLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: var(--color-bg-main);
  overflow: auto;

  .main {
    padding: 0px 88px;
    overflow-x: hidden;
    background-color: var(--color-bg-main);

    .main-content {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 150px);
    }

    @media only screen and (max-width: 768px) {
      padding: 0px;
    }
  }

  /* width */
  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 3px;
    background-color: #2e2f35;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #3e3f45;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: base;
  padding: 20px 5%;
  background-color: var(--color-blue);
  color: white;
  font-size: 14px;

  .alert {
  }

  .close {
    cursor: pointer;
  }
`;

function MainLayout({ title, isHeader, currentAsset, children }) {
  // useEffect(() => {
  //   if (!localStorage.getItem('bannerClose')) setBannerShow(true);
  // }, []);

  return (
    <MainLayoutWrapper>
      <Row>
        {/* <Column xs="12" sm="12">
          {bannerShow && (
            <Banner>
              <div className="alert">             
              </div>
              <div
                className="close"
                onClick={() => {
                  setBannerShow(false);
                  localStorage.setItem('bannerClose', true);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.70501 3.01562L3.01501 3.70562L11.31 12.0006L3.01501 20.2956L3.70501 20.9856L12 12.6906L20.295 20.9856L20.985 20.2956L12.69 12.0006L20.985 3.70562L20.295 3.01562L12 11.3106L3.70501 3.01562Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Banner>
          )}
        </Column> */}
        <Column xs="12" sm="12">
          <Sidebar />
        </Column>
        <Column xs="12" sm="12" className="main">
          <Row>
            {isHeader && title && (
              <Column xs="12">
                <Header title={title} currentAsset={currentAsset} />
              </Column>
            )}
            <Column xs="12">
              <div className="main-content">{children}</div>
            </Column>
          </Row>
        </Column>
        <Column xs="12" sm="12">
          <Footer />
        </Column>
      </Row>
    </MainLayoutWrapper>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  isHeader: PropTypes.bool,
  currentAsset: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

MainLayout.defaultProps = {
  title: '',
  isHeader: true,
  currentAsset: '',
  children: null
};

export default withTheme(MainLayout);
