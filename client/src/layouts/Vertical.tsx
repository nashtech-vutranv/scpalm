'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { useViewport } from '../hooks'
import { changeBodyAttribute } from '../utils'
import * as layoutConstants from '../appConstants'

const LeftSidebar = React.lazy(() => import('./LeftSidebar'))

const loading = () => <div className=""></div>

const VerticalLayout = () => {
  const { width } = useViewport()
  const [leftSideBarType, setLeftSideBarType] = useState('condense')
  const [leftSideBarTheme, setLefSideBarTheme] = useState('dark')

  useEffect(() => {
    changeBodyAttribute('data-leftbar-theme', leftSideBarTheme)
  }, [leftSideBarTheme])

  useEffect(() => {
    changeBodyAttribute('data-leftbar-compact-mode', leftSideBarType)
  }, [leftSideBarType])

  const updateDimensions = useCallback(() => {
    // activate the condensed sidebar if smaller devices like ipad or tablet
    if (width > 768 && width <= 1028) {
      setLeftSideBarType(
        layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_CONDENSED
      )
    } else if (width > 1028) {
      setLeftSideBarType(layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_FIXED)
    }
  }, [width])

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [updateDimensions])

  const isCondensed =
    leftSideBarType === layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_CONDENSED

  return (
    <>
      <div className="wrapper">
        <Suspense fallback={loading()}>
          <LeftSidebar
            isCondensed={isCondensed}
            isLight={true}
            hideUserProfile={true}
          />
        </Suspense>
        <div className="content-page">
          <div className="content">
            {/* <Suspense fallback={loading()}>
                            <Topbar openLeftMenuCallBack={openMenu} hideLogo={true} />
                        </Suspense> */}
            <Container fluid>
              <Outlet />
            </Container>
          </div>

          {/* <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense> */}
        </div>
      </div>
    </>
  )
}
export default VerticalLayout
