import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

// import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <p>
          Written by <strong>Cedric Charly</strong> who lives and works in
          Austin.
          <div>
            <a href="https://github.com/cedricgc"> GitHub</a>
          </div>
        </p>
      </div>
    )
  }
}

export default Bio

// <img
//   src={profilePic}
//   alt={`Cedric Charly`}
//   style={{
//     marginRight: rhythm(1 / 2),
//     marginBottom: 0,
//     width: rhythm(2),
//     height: rhythm(2),
//   }}
// />
