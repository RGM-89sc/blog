const { useState, useEffect } = require('react')

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  }
}

function getContentWidth() {
  const { innerWidth } = getSize()
  if (innerWidth > 2000) {
    return '40%'
  } else if (innerWidth > 1900) {
    return '42.5%'
  } else if (innerWidth > 1800) {
    return '45%'
  } else if (innerWidth > 1700) {
    return '47.5%'
  } else if (innerWidth > 1600) {
    return '50%'
  } else if (innerWidth > 1500) {
    return '52.5%'
  } else if (innerWidth > 1400) {
    return '55%'
  } else if (innerWidth > 1300) {
    return '57.5%'
  } else if (innerWidth > 1200) {
    return '60%'
  } else if (innerWidth > 1100) {
    return '65%'
  } else if (innerWidth > 1000) {
    return '70%'
  } else if (innerWidth > 900) {
    return '75%'
  } else if (innerWidth > 800) {
    return '80%'
  } else if (innerWidth > 700) {
    return '85%'
  }  else if (innerWidth > 600) {
    return '90%'
  }  else if (innerWidth > 500) {
    return '95%'
  } else {
    return '100%'
  }
}

function useContentWidth() {
  let [contentWidth, setContentWidth] = useState(getContentWidth())

  function debounce(handle: () => any, delay: number) {
    let timer: number
    return () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(handle, delay)
    }
  }

  function handleResize() {
    setContentWidth(getContentWidth())
  }

  useEffect(() => {
    const handler = debounce(handleResize, 500)
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return contentWidth
}

export default useContentWidth