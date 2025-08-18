const LocalBusinessInfo = () => {
  const phoneNumber = "+542915221351"
  const formattedPhoneNumber = "291 522-1351"

  return (
    <div>
      <h1>Contact Information</h1>
      <p>Phone: {formattedPhoneNumber}</p>
      <a href={`tel:${phoneNumber}`} className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
        {formattedPhoneNumber}
      </a>
      {/* rest of code here */}
    </div>
  )
}

export default LocalBusinessInfo
