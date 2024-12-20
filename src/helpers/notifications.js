import iziToast from 'izitoast'

export function iziError (msg) {
  iziToast.error({
    message: msg,
    drag: true,
    progressBar: false,
    pauseOnHover: false,
    timeout: 3000,
    close: false,
    animateInside: true,
    closeOnClick: true,
    position: 'topCenter',
    displayMode: 'replace'
  })
}

export function iziSuccess (msg) {
  iziToast.success({
    message: msg,
    drag: true,
    progressBar: false,
    pauseOnHover: false,
    timeout: 3000,
    close: false,
    animateInside: true,
    closeOnClick: true,
    position: 'topCenter',
    displayMode: 'replace'
  })
}
export function iziWarning (msg) {
  iziToast.warning({
    message: msg,
    drag: true,
    progressBar: false,
    pauseOnHover: false,
    timeout: 3000,
    close: false,
    animateInside: true,
    closeOnClick: true,
    position: 'topCenter',
    displayMode: 'replace'
  })
}
export function iziQuestion (title, buttons, callback) {
  let cancelar = 'cancelar'
  iziToast.question({
    timeout: 3500,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 9999,
    title: title,
    message: '',
    position: 'center',
    buttons: buttons.map(button => {
      return [
        `<button>${button.text}</button>`,
        function (instance, toast) {
          if (button.value !== cancelar) {
            callback(button.value)
          } else {
            callback(cancelar)
          }
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button', button.value)
        },
        button.isDefault || false
      ]
    }),
    onClosing: function (instance, toast, closedBy) {
      console.info('Closing | closedBy: ' + closedBy)
      if (closedBy === 'overlay') {
        callback(cancelar)
      }
    },
    onClosed: function (instance, toast, closedBy) {
      console.info('Closed | closedBy: ' + closedBy)
    }
  })
}
