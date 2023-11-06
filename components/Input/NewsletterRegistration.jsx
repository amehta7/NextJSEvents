import React, { useRef, useState, useContext } from 'react'
import classes from './newsletter-registration.module.css'
import NotificationContext from '../../store/notification-context'

const NewsletterRegistration = () => {
  const [isInvalid, setIsInvalid] = useState(false)

  const notificationCtx = useContext(NotificationContext)

  const inputRef = useRef()

  const registrationHandler = async (event) => {
    event.preventDefault()

    const enteredEmail = inputRef.current.value

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      setIsInvalid(true)
      return
    }

    try {
      notificationCtx.showNotification({
        title: 'Signing up...',
        message: 'Registering for newsletter.',
        status: 'pending',
      })

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        await response.json()
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter.',
          status: 'success',
        })
      } else {
        const data = await response.json()

        //console.log(data)
        throw new Error(data.message || 'Something went wrong!')
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      })
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputRef}
            required
          />
          {isInvalid && <p>Please enter a valid email address!</p>}
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
