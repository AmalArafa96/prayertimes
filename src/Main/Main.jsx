import React, { useEffect, useState } from "react";
import Prayer from "../Prayer/Prayer";
import "./main.css";

export default function Main() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTimes, setDateTimes] = useState("");
  const [city, setCity] = useState("Cairo");
  const cities = [
    { name: "القاهره", value: "Cairo" },
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "الجيزه", value: "Giza" },
    { name: "المنصوره", value: "Mansoura" },
    { name: "اسوان", value: "Aswan" },
    { name: "الاقصر", value: "Luxor" },
  ];
  console.log(city);
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`
        );
        const data_prayer = await response.json();
        setPrayerTimes(data_prayer.data.timings);
        setDateTimes(data_prayer.data.date.gregorian.date);
        console.log("data time is", data_prayer.data.timings);
        console.log("date is", data_prayer.data.date.gregorian.date);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPrayerTimes();
  }, [city]);

  function formateTimes(time){
    if(!time){
        return "00:00"
    }
    let[hours,minutes]=time.split(':').map(Number)
    const perd= hours >= 12 ? 'PM' : 'AM';
    hours=hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`

  }
  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="container mx-auto ">
        <div className="top-sec flex justify-around items-center gap-3">
          <div className="city w-1/2">
            <h3 className="text-[16px] sm:text-[18px] text-white">المدينه</h3>
            <select
              name=""
              id=""
              onChange={(e) => setCity(e.target.value)}
              className="rounded-[5px] outline-none bg-[#a54f3a] text-[16px] sm:text-[18px]  text-white w-full sm:w-auto"
            >
              {cities.map((city) => {
                return (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="date w-1/2 text-left">
            <h3 className="text-[16px] sm:text-[18px] text-white">التاريخ</h3>
            <h4 className="text-[16px] sm:text-[18px] text-white ">
              {dateTimes}
            </h4>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
        <Prayer name="الامساك" time={ formateTimes(prayerTimes.Imsak)} />
          <Prayer name="الفجر" time={ formateTimes(prayerTimes.Fajr)} />
          <Prayer name="الشروق" time={ formateTimes(prayerTimes.Sunrise)} />
          <Prayer name="الظهر" time={ formateTimes(prayerTimes.Dhuhr)} />
          <Prayer name="العصر" time={ formateTimes(prayerTimes.Asr)} />
          <Prayer name="المغرب" time={ formateTimes(prayerTimes.Maghrib)} />
          <Prayer name="العشاء" time={ formateTimes(prayerTimes.Isha)} />
          <Prayer name="منتصف الليل " time={ formateTimes(prayerTimes.Midnight)} />
        </div>
      </div>
    </section>
  );
}
