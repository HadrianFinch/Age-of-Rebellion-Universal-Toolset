init();
function init()
{
    document.querySelector('#defaultOpen').click();
    var rs = getComputedStyle(document.querySelector(':root'));
    document.querySelector('.topBox input[type="color"]').value = rs.getPropertyValue('--themeColor');

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) 
    {
        coll[i].addEventListener("click", function() 
        {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight)
            {
                content.style.maxHeight = null;
            }
            else 
            {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
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

document.querySelector('#Species select').oninput = function()
{
    var elms = document.querySelectorAll("div.raceOption");
    for (let i = 0; i < elms.length; i++)
    {
        var elm = elms[i];
        elm.style.display = null;
    }

    document.querySelector('#' + this.value).style.display = 'block';
}
