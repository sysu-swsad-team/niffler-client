<template>
  <div id="root">
    <div class="App">
      <div class="Panel FormPanel">
        <template v-if="signIn">
          <h2>NIFFLER</h2>
          <div class="Social">
          </div>
          <p id="niffler-desc">一个可以赚闲钱的 APP</p>
          <LoginForm class="sign-in-out-form"></LoginForm>
        </template>
        <template v-else>
          <h2 id="signup-title">SIGN UP</h2>
          <div class="Social">
          </div>
          <RegisterForm class="sign-in-out-form"></RegisterForm>
        </template>
      </div>
      <div class="Panel ActionPanel">
        <template v-if="signIn">
          <h2>Hello friend!</h2>
          <p style="padding: 50px 0px 20px 0px;">现在加入 NIFFLER</p>
          <button @click="slide">Sign up!</button>
        </template>
        <template v-else>
          <h2>Welcome back!</h2>
          <p style="padding: 50px 0px 20px 0px;">欢迎回来 !</p>
          <button @click="slide">Sign in!</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
export default {
  data () {
    return {
      signIn: true,
      transition: false
    }
  },
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    slide () {
      // retrieve the signIn boolean
      const {signIn, transition} = this // if already transitioning, pre-emptively escape the function
      // else continue applying the slide effect
      if (transition) {
        return
      } // target the two panel elements
      const formPanel = document.querySelector('.FormPanel')
      const actionPanel = document.querySelector('.ActionPanel') // retrieve the child elements of the action panel (to transition them in and out of view)
      const actionPanelChildren = actionPanel.children // continue only if the elements are not transitioning
      // retrieve the bounding box allowing to decipher the position and size of the elements
      const formBoundingRect = formPanel.getBoundingClientRect()
      const actionBoundingRect = actionPanel.getBoundingClientRect() // apply a transition (later removed to re-arrange the position of the elements without visual modification)
      formPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)'
      actionPanel.style.transition = 'all 0.7s cubic-bezier(.63,.39,.54,.91)' // apply a transiton to the child elements of the second panel as well
      ;[...actionPanelChildren].forEach(child => (child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)'))
      this.transition = true // if signing in slide the form panel to the right, the action panel the other way
      if (signIn) {
        // by an amount equal to the other element's width
        formPanel.style.transform = `translateX(${actionBoundingRect.width}px)`
        actionPanel.style.transform = `translateX(${-formBoundingRect.width}px)` // transition the child elements out of sight in a direction opposite to the action panel
        ;[...actionPanelChildren].forEach(child => {
          child.style.transform = `translateX(${actionBoundingRect.width / 2}px)`
          child.style.opacity = 0
          child.style.visibility = 'hidden'
        }) // ! update the border radius as well
        formPanel.style.borderRadius = '0 20px 20px 0'
        actionPanel.style.borderRadius = '20px 0 0 20px'
      } else {
        // else translate the elements back to where they sat earlier
        // ! not to translateX(0), as their position is actually and soon modified
        formPanel.style.transform = `translateX(${-actionBoundingRect.width}px)`
        actionPanel.style.transform = `translateX(${formBoundingRect.width}px)`
        ;[...actionPanelChildren].forEach(child => {
          child.style.transform = `translateX(${-actionBoundingRect.width / 2}px)`
          child.style.opacity = 0
          child.style.visibility = 'hidden'
        })
        formPanel.style.borderRadius = '20px 0 0 20px'
        actionPanel.style.borderRadius = '0 20px 20px 0'
      } // ! update the state before the transition has a chance to complete, to have the content appear
      const timeoutState = setTimeout(() => {
        // remove the transition on the child elements to reposition them on the opposite side of the incoming direciton
        [...actionPanelChildren].forEach(child => {
          child.style.transition = 'none'
          child.style.transform = `translateX(${signIn ? -actionBoundingRect.width / 3 : actionBoundingRect.width / 3}%)`
        })
        this.signIn = !signIn
        clearTimeout(timeoutState)
      }, 350)
      const timeoutChildren = setTimeout(() => {
        // transition the child elements back into view
        [...actionPanelChildren].forEach(child => {
          child.style.transition = 'all 0.35s cubic-bezier(.63,.39,.54,.91)'
          child.style.transform = 'translateX(0)'
          child.style.opacity = 1
          child.style.visibility = 'visible'
        })
        clearTimeout(timeoutChildren)
      }, 400) // after the transition is complete
      const timeoutTransition = setTimeout(() => {
        // remove the transition
        formPanel.style.transition = 'none'
        actionPanel.style.transition = 'none' // immediately remove the translation and re-arrange the elements to have the action panel effectively to the left
        // ! accessibility concerns
        formPanel.style.transform = 'translate(0)'
        actionPanel.style.transform = 'translate(0)'
        actionPanel.style.order = signIn ? -1 : 1
        this.transition = false
        clearTimeout(timeoutTransition)
      }, 700)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss_vars';
/* font and color palette */
.sign-in-out-form {
  overflow-y: auto;
  border: 0px;
  width: 300px;
}
#signup-title {
  padding: 40px 0px 20px 0px;
}
button {
  outline: none !important;
  cursor: pointer;
}
h2 {
  margin: 0px !important;
  font-weight: bold;
}
#root {
  overflow-y: auto;
  --bg: #F0F4F3;
  // --theme: #3AB19B;
  --theme: #1D365D;
  --theme-two: #FFFFFF;
  --text: #697a79;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#root {
  height: 100%;
  /* include a circle and a triangle elements through SVG shapes, and at either end of the page */
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><circle cx="50" cy="50" r="50" fill="%23FBCD44"/></g></svg>'), url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><path d="M 0 80 l 100 -80 v 100 z" fill="%23E35E6A"/></g></svg>'), var(--bg);
  background-repeat: no-repeat;
  background-position: bottom -150px left -70px, top -120px right -100px;
  background-size: 300px, 380px, 100%;
  font-family: 'Montserrat', sans-serif;
  color: var(--text);
  /* center the main element in the viewport */
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
/* include the same shapes included in the background atop the content of the page, with a semi-translucent white
this softens the color of the shapes, but most prominently shows the shapes as if continuing on the underlying content
*/
#root:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><circle cx="50" cy="50" r="50" fill="%23ffffff22"/></g></svg>'), url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8 0.8) translate(5 5)"><path d="M 0 80 l 100 -80 v 100 z" fill="%23ffffff22"/></g></svg>');
  background-repeat: no-repeat;
  background-position: bottom -150px left -70px, top -120px right -100px;
  background-size: 300px, 380px;
}

.App {
  /* cap the width of the main panel */
  min-width: 600px;
  max-width: 800px;
  width: 800px;
  /* minimum height to avoid a change in size with one additional input element */
  min-height: 690px;
  background: var(--theme-two);
  border-radius: 20px;
  box-shadow: 0 2px 5px -6px var(--text),0 0 30px -50px var(--text);
  /* display the halves side by side */
  display: flex;
}
/* for both panels
display the content in a single column layout
*/
.Panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2;
  position: relative;
  /* ooverflow hidden to avoid janky horizontal scroll as the child elements are transitioned into view */
  overflow-x: hidden;

}
/* styles shared by the halves' elements */
.Panel h2 {
  font-size: 1.9rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
}
.Panel p {
  padding: 50px 0px 20px 0px;
  // margin: 1rem 0;
  max-width: 25ch;
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 300;
  text-align: center;
}
.Panel a, .Panel button {
  color: inherit;
  font-family: inherit;
}
.Panel a {
  text-decoration: none;
  // margin: 1rem 1rem;
}
/* style the anchor links nesting the social platforms in a circle */
.Panel .Social a {
  display: inline-block;
  font-weight: 900;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid currentColor;
}
/* on hover and on focus switch the color of the links making up the social icons */
.Panel .Social a:hover,
.Panel .Social a:focus {
  background: var(--text);
  color: var(--theme-two);
}
/* include a semi-transparent border at the bottom of the anchor link elements which are direct children of the parent
this excludes the social icons */
.Panel > a {
  position: relative;
}
.Panel > a:after {
  content: '';
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  border-bottom: 1px dashed currentColor;
  opacity: 0.4;
}
/* display the input elements atop one another */
.Panel form {
  display: flex;
  flex-direction: column;
}
/* widen the input elements to cover a sizeable portion of the panel */
.Panel form input {
  margin: 0.5rem 0;
  // width: 200px;
  padding: 1rem 0.75rem;
  background: var(--bg);
  border: none;
  color: inherit;
  font-family: inherit;
}
.Panel form input::placeholder {
  opacity: 0.8;
}
/* style the buttons to sign in/sign up to have considerable white space _around_ the text */
.Panel button {
  background: none;
  border: 1px solid currentColor;
  border-radius: 50px;
  padding: 0.85rem 2.75rem;
  margin: 5px 0;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
}
/* expand the first half to cover twice the space of the second half */
.FormPanel {
  width: 400px;
  overflow: hidden;
  flex-grow: 2;
  /* remove the border radius for the corners matching the container */
  border-radius: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.FormPanel button {
  background: var(--theme);
  color: var(--theme-two);
}
.ActionPanel {
  width: 300px;
  overflow: hidden;
  /* background and color using the theme */
  background: var(--theme);
  color: var(--theme-two);
  padding: 2rem;
  flex-grow: 1;
  /* remove the border radius for the corners matching the container */
  border-radius: inherit;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
/*
on smaller viewports position the panel atop one another
expand the main panel to cover the entirety of the viewport
*/
@media (max-width: 650px) {
  #root {
    overflow-x: hidden;
    padding: 0;
  }
  .App {
    flex-direction: column;
    border-radius: 0;
    width: 600px;
    height: 100%;
    margin: 0 auto;
    box-shadow: none;
  }
}
/*
on smaller viewports remove the border radius
*/
@media (max-width: 650px) {
  .FormPanel {
    margin-bottom: 5px;
    height: 50%;
    overflow-y: auto;
    margin: 0px auto !important;
    border-radius: 0;
  }
  #niffler-desc {
    padding: 30px 0px 20px 0px;
  }
  #signup-title {
    padding: 5px 0px;
  }
}
/*
on smaller viewports remove the border radius
*/
@media (max-width: 650px) {
  .ActionPanel {
    height: 50%;
    width: 600px;
    border-radius: 0px !important;
    margin: 0 auto;
  }
}
</style>
