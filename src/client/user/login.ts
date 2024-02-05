document.getElementById("loginbtn")?.addEventListener("click", (ev) => {
	ev.preventDefault();
	window.open("/user/login/pop", "_blank", "height=400, width=550");
});
