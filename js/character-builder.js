init();
function init()
{
    document.querySelector('#defaultOpen').click();
    var rs = getComputedStyle(document.querySelector(':root'));
    document.querySelector('.topBox input[type="color"]').value = rs.getPropertyValue('--themeColor');
}
document.querySelector('.topBox input[type="color"]').oninput = function()
{
    setThemeColor(this.value);
}
function setThemeColor(color)
{
    document.querySelector(':root').style.setProperty('--themecolor', color);
    localStorage.setItem("themeColor", color);
}
function openTab(evt, tabName) 
{
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
    {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) 
    {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
