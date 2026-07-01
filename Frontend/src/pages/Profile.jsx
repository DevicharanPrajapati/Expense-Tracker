import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  return (
 <div className="min-h-screen bg-gray-100 p-6 rounded-2xl">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
      <p className="text-gray-500 mb-8">Manage your profile information.</p>

      
        <ProfileCard/>
      </div>
  )
}

export default Profile