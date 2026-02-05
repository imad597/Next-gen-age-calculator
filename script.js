"use strict";

const dobInput = document.getElementById("dob");
const targetInput = document.getElementById("targetDate");
const calcBtn = document.getElementById("calcBtn");

const results = document.getElementById("results");
const statsGrid = document.getElementById("ageStats");
const nextBirthdayCard = document.getElementById("nextBirthday");
const birthdayText = document.getElementById("birthdayCountdown");
const funFactsCard = document.getElementById("funFacts");
const factsList = document.getElementById("factsList");

calcBtn.addEventListener("click", () => {
  if (!dobInput.value) return alert("Please select your date of birth");

  const dob = new Date(dobInput.value);
  const target = targetInput.value ? new Date(targetInput.value) : new Date();

  if (target < dob) return alert("Target date cannot be before birth date");

  calculateAge(dob, target);
  showNextBirthday(dob);
  showFunFacts(dob, target);

  results.classList.remove("hidden");
  nextBirthdayCard.classList.remove("hidden");
  funFactsCard.classList.remove("hidden");
});

function calculateAge(dob, today) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  statsGrid.innerHTML = `
    <div class="stat-box"><h3>${years}</h3><p>Years</p></div>
    <div class="stat-box"><h3>${months}</h3><p>Months</p></div>
    <div class="stat-box"><h3>${days}</h3><p>Days</p></div>
  `;
}

function showNextBirthday(dob) {
  const now = new Date();
  let next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < now) next.setFullYear(now.getFullYear() + 1);

  const diff = next - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  birthdayText.textContent = `${days} days left until your next birthday 🎉`;
}

function showFunFacts(dob, today) {
  const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  const zodiac = getZodiac(dob);
  const stone = getBirthstone(dob.getMonth());

  factsList.innerHTML = `
    <li>You have completed approximately <strong>${totalDays}</strong> days of life.</li>
    <li>Your Zodiac sign is <strong>${zodiac}</strong>.</li>
    <li>Your birthstone is <strong>${stone}</strong>.</li>
    <li>The year ahead may bring growth, learning, and new opportunities.</li>
  `;
}

function getZodiac(date) {
  const d = date.getDate(), m = date.getMonth() + 1;
  if ((m==3&&d>=21)||(m==4&&d<=19)) return "Aries";
  if ((m==4&&d>=20)||(m==5&&d<=20)) return "Taurus";
  if ((m==5&&d>=21)||(m==6&&d<=20)) return "Gemini";
  if ((m==6&&d>=21)||(m==7&&d<=22)) return "Cancer";
  if ((m==7&&d>=23)||(m==8&&d<=22)) return "Leo";
  if ((m==8&&d>=23)||(m==9&&d<=22)) return "Virgo";
  if ((m==9&&d>=23)||(m==10&&d<=22)) return "Libra";
  if ((m==10&&d>=23)||(m==11&&d<=21)) return "Scorpio";
  if ((m==11&&d>=22)||(m==12&&d<=21)) return "Sagittarius";
  if ((m==12&&d>=22)||(m==1&&d<=19)) return "Capricorn";
  if ((m==1&&d>=20)||(m==2&&d<=18)) return "Aquarius";
  return "Pisces";
}

function getBirthstone(month) {
  const stones = ["Garnet","Amethyst","Aquamarine","Diamond","Emerald","Pearl","Ruby","Peridot","Sapphire","Opal","Topaz","Turquoise"];
  return stones[month];
}
// Hamburger Menu Toggle
const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
