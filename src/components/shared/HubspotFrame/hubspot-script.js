// DO NOT REMOVE
// eslint-disable-next-line
const scriptAbout = () => {
  ;(function () {
    const createAction = (type, payload) => {
      return {
        type,
        payload,
      }
    }
    const sendMessage = (action) => {
      window.parent.postMessage(action, '*')
    }

    window.addEventListener('DOMContentLoaded', () => {
      window.addEventListener(
        'message',
        (event) => {
          if (event.data.type === 'set-config') {
            const config = event.data.payload.config

            config.handlers?.forEach((handler) => {
              const element = document.querySelector(handler.selector)

              switch (handler.type) {
                case 'click-button': {
                  element.addEventListener('click', (e) => {
                    e.preventDefault()

                    sendMessage(
                      createAction('click-button', {
                        buttonName: handler.name,
                      }),
                    )
                  })
                  break
                }
                default: {
                  // eslint-disable-next-line no-console
                  console.log('There is not the event: ' + handler.type)
                }
              }
            })

            const links = document.querySelectorAll('a')

            links.forEach((link) => {
              link.onclick = 'event.preventDefault()'

              link.addEventListener('click', (e) => {
                e.preventDefault()

                sendMessage(
                  createAction('click-button', {
                    buttonName: 'link',
                    href: link.href,
                    disabled: !!link.dataset.nicityDisabled,
                  }),
                )
              })
            })

            const buttons = document.querySelectorAll('[data-link-id]')

            buttons.forEach((link) => {
              link.addEventListener('click', (e) => {
                e.preventDefault()

                sendMessage(
                  createAction('click-button', {
                    buttonName: link.dataset.linkId,
                    disabled: !!link.dataset.nicityDisabled,
                  }),
                )
              })
            })

            const disabledElements = document.querySelectorAll(
              '[data-nicity-disabled]',
            )

            disabledElements.forEach((element) => {
              element.addEventListener('click', (e) => {
                e.preventDefault()

                sendMessage(createAction('click-disabled-element', {}))
              })
            })

            if (config.withAddTasks) {
              const createPopup = (text, top, left) => {
                const popup = document.createElement('div')

                popup.style = Object.entries({
                  position: 'fixed',
                  top: `${top - 38}px`,
                  left: `${left}px`,
                  cursor: 'pointer',
                  padding: '8px 16px',
                  color: '#12151F',
                  'min-width': '104px',
                  'font-size': '16px',
                  'box-shadow':
                    '0 2px 4px rgb(0 0 0 / 8%), 0 3.78px 33.4221px rgb(0 0 0 / 6%)',
                  'z-index': '100',
                  'border-radius': '12px',
                  background: 'white',
                })
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(';')

                popup.textContent = 'Add task?'
                popup.id = 'nicity-add-task-popup'
                popup.onclick = () => {
                  sendMessage(
                    createAction('add-task', {
                      text: text,
                    }),
                  )
                }

                document.body.appendChild(popup)

                return () => {
                  document.body.removeChild(popup)
                }
              }

              document.querySelectorAll('p').forEach((element) => {
                element.addEventListener('mouseup', () => {
                  const selection = window.getSelection()

                  if (selection) {
                    const [startIndex, endIndex] = [
                      selection.baseOffset,
                      selection.focusOffset,
                    ].sort()
                    const text = selection.focusNode.textContent.slice(
                      startIndex,
                      endIndex,
                    )

                    if (text) {
                      const rect = element.getBoundingClientRect()
                      const removePopup = createPopup(text, rect.top, rect.left)
                      setTimeout(() => {
                        function clickHandler() {
                          removePopup()
                          document.body.removeEventListener(
                            'click',
                            clickHandler,
                          )
                        }
                        document.body.addEventListener('click', clickHandler)
                      }, 300)
                    }
                  }
                })
              })
            }
          }
        },
        false,
      )

      sendMessage(
        createAction('load', {
          title: document.title,
          description:
            document.querySelector('meta[name="description"]')?.content || '',
        }),
      )
    })

    // Remove badge
    const badge = document.querySelector('.grecaptcha-badge')
    const captchaText = document.createElement('div')

    captchaText.innerHTML =
      'This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.'
    badge.replaceWith(captchaText)
  })()
}
