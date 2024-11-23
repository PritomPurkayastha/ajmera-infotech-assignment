import { useContext } from 'react'
import ProfileContext from '../context/ProfileContext'

const Navigation = () => {
  const {profile} = useContext(ProfileContext);
  return (
    <div className='shadow-sm p-5'>
      {profile.name}
    </div>
  )
}

export default Navigation