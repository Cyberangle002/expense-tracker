const PROFILE_KEY = "trackerpro_profile";
let profile = {};

/* Load Profile */
(function loadProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
  profile = raw ? JSON.parse(raw) : {};

  if (profile.name) document.getElementById("profileName").value = profile.name;
  if (profile.email) document.getElementById("profileEmail").value = profile.email;
  if (profile.phone) document.getElementById("profilePhone").value = profile.phone;
  if (profile.photo) document.getElementById("profileImg").src = profile.photo;
})();

/* Save Profile */
function saveProfile() {
  profile = {
    name: profileName.value,
    email: profileEmail.value,
    phone: profilePhone.value,
    photo: profile.photo || "assets/img/user.png"
  };

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  alert("Profile saved!");
}

/* Upload Photo */
document.getElementById("uploadPhoto").addEventListener("change", function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    profile.photo = reader.result;
    document.getElementById("profileImg").src = reader.result;
  };
  reader.readAsDataURL(file);
});
