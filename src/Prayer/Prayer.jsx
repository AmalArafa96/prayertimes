

export default function Prayer({name , time}) {
  return (
    <div className="prayer flex justify-between items-center text-[18px] text-white">
      <p className="name-prayer">{name}</p>
      <p className="time-prayer">{time}</p>
    </div>
  )
}
