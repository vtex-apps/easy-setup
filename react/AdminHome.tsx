/* eslint-disable no-console */
import type { FunctionComponent } from 'react'
import React, { useCallback, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Layout,
  PageHeader,
  Button,
  PageBlock,
  Progress,
  ModalDialog,
  Alert,
  IconFailure,
  IconSuccess,
  Tooltip,
  EmptyState,
  CheckboxGroup,
  ToastProvider,
  withToast,
} from 'vtex.styleguide'

import type { PopulateResponse } from './typings/populate'

import './styles.global.css'

interface AdminHomeState {
  setupStarted: boolean
  isModalOpen: boolean
  setupSuccess: boolean | null
  error: any
  result: PopulateResponse | null
  checkedMap: CheckboxGroup
}

interface CheckboxGroup {
  [key: string]: CheckboxGroupItem
}

interface CheckboxGroupItem {
  label: string
  checked: boolean
}

interface AdminHomeProps {
  showToast: any
}

const AdminHome: FunctionComponent<AdminHomeProps> = ({ showToast }) => {
  const initialCheckedMap: CheckboxGroup = {
    benefits: { label: 'Benefits', checked: true },
    brands: { label: 'Brands', checked: true },
    categories: { label: 'Categories', checked: true },
    checkout: { label: 'Checkout', checked: true },
    collections: { label: 'Collections', checked: true },
    fields: { label: 'Fields', checked: true },
    logistics: { label: 'Logistics', checked: true },
    payments: { label: 'Payments', checked: true },
    prices: { label: 'Prices', checked: true },
    products: { label: 'Products', checked: true },
    taxes: { label: 'Taxes', checked: true },
    users: { label: 'Users', checked: true },
    organizations: { label: 'Organizations', checked: true },
    reseller: { label: 'Reseller', checked: true },
  }

  const initialState: AdminHomeState = {
    setupStarted: false,
    isModalOpen: false,
    setupSuccess: null,
    error: null,
    result: null,
    checkedMap: initialCheckedMap,
  }

  const [state, setState] = useState<AdminHomeState>(initialState)

  const {
    setupStarted,
    isModalOpen,
    setupSuccess,
    error,
    result,
    checkedMap,
  } = state

  const title = <FormattedMessage id="admin/easy-setup.title" />

  const pageHeader = <PageHeader title={title} />

  const layoutProps = {
    pageHeader,
  }

  const resources = Object.keys(checkedMap)
    .map(key => {
      const { checked } = checkedMap[key]

      if (checked) return key

      return null
    })
    .filter(item => item)

  const handleStartSetupButtonOnClick = () => {
    if (!resources.length) {
      showToast({ message: 'Please choose at least one resource.' })

      return
    }

    setState({ ...state, isModalOpen: true })
  }

  const handleConfirmation = () => {
    setState({ ...state, isModalOpen: false, setupStarted: true })

    const myHeaders = new Headers()

    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    fetch('/_v/api/easy-setup/populate', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        resources,
      }),
    })
      .then(response => {
        if (!response.ok) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw response
        }

        return response.json()
      })
      .then((JSONResult: PopulateResponse) => {
        console.log({ JSONResult })

        setState({
          ...state,
          isModalOpen: false,
          setupSuccess: true,
          setupStarted: false,
          result: JSONResult,
        })
      })
      .catch(err => {
        if (err.message) {
          setState({
            ...state,
            isModalOpen: false,
            setupSuccess: false,
            setupStarted: false,
            error: err.message,
          })
        } else {
          err.text().then((errorText: any) => {
            setState({
              ...state,
              isModalOpen: false,
              setupSuccess: false,
              setupStarted: false,
              error: errorText,
            })
            console.log('error', errorText)
          })
        }
      })
  }

  const handleCancelation = () => {
    setState({ ...state, isModalOpen: false })
  }

  const handleOnCloseAlert = () => {
    setState({ ...initialState })
  }

  const resultHasErrors = useCallback(() => {
    if (!result) return false

    return !!Object.keys(result)
      .map(item => {
        const { error: errorMsg } = result[item]

        if (errorMsg && errorMsg !== 'resource not set') return true

        return null
      })
      .filter(item => item).length
  }, [result])

  console.log(resultHasErrors())

  return (
    <>
      <Layout {...layoutProps}>
        <PageBlock
          variation={!setupStarted && setupSuccess === null ? 'aside' : 'full'}
        >
          {!setupStarted && setupSuccess === null ? (
            <EmptyState>
              <p className="lh-copy">
                Please click the button bellow to start the setup process.
              </p>
              <Button onClick={handleStartSetupButtonOnClick}>
                Start Easy Setup
              </Button>
            </EmptyState>
          ) : null}
          {!setupStarted && setupSuccess === null ? (
            <CheckboxGroup
              name="resources"
              label="All Resources"
              id="resources"
              value="resources"
              checkedMap={checkedMap}
              onGroupChange={newCheckedMap => {
                console.log({ newCheckedMap })
                setState({ ...state, checkedMap: newCheckedMap })
              }}
            />
          ) : null}
          {setupStarted && setupSuccess === null ? (
            <Progress type="steps" steps={['inProgress']} />
          ) : null}
          {!setupStarted && setupSuccess === true ? (
            <>
              {resultHasErrors() ? (
                <Alert type="warning" onClose={handleOnCloseAlert}>
                  Ops! Some items did not complete successfully.
                </Alert>
              ) : (
                <Alert type="success" onClose={handleOnCloseAlert}>
                  Yay! Setup has run successfully!
                </Alert>
              )}
              <p className="lh-title t-action">Summary:</p>
              {result
                ? Object.keys(result).map((item, key) => {
                    const { error: errorMsg } = result[item]

                    if (errorMsg === 'resource not set') return null

                    return (
                      <div key={key} className="t-small lh-copy mb3">
                        {item}:{' '}
                        {errorMsg ? (
                          <>
                            <div className="dib v-mid">
                              <Tooltip label={errorMsg}>
                                <IconFailure size={16} color="#ff4c4c" />
                              </Tooltip>
                            </div>
                            <div className="br2 bg-muted-5 pa5">
                              <code>{`${errorMsg}`}</code>
                            </div>
                          </>
                        ) : (
                          <div className="dib v-mid">
                            <IconSuccess size={16} color="#79b03a" />
                          </div>
                        )}
                      </div>
                    )
                  })
                : null}
            </>
          ) : null}
          {!setupStarted && setupSuccess === false ? (
            <>
              <Alert type="error" onClose={handleOnCloseAlert}>
                Oops! An error has occurred during the setup process.
              </Alert>
              <p className="lh-title t-action">Error:</p>
              <div className="br2 bg-muted-5 pa5">
                <code>{`${error}`}</code>
              </div>
            </>
          ) : null}
        </PageBlock>
      </Layout>
      <ModalDialog
        centered
        confirmation={{
          onClick: handleConfirmation,
          label: 'I understand',
          isDangerous: true,
        }}
        cancelation={{
          onClick: handleCancelation,
          label: 'Cancel',
        }}
        isOpen={isModalOpen}
        onClose={handleCancelation}
      >
        <p className="f3 f3-ns fw3 gray">Are you sure you want proceed?</p>
        <p>
          This action is irreversible. It will remove any customizations
          previously made and can result in to an error if ran consecutively.
        </p>
      </ModalDialog>
    </>
  )
}

const AdminWithToast = withToast(AdminHome)

// eslint-disable-next-line react/display-name
export default function () {
  return (
    <ToastProvider positioning="window">
      <AdminWithToast />
    </ToastProvider>
  )
}
