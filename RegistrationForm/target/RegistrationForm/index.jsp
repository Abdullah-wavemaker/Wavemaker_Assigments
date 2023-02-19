<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Badminton registration form</title>
<link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
<form action="RegServ" method="get">
  <div class="container">
  <center><h1> Badminton Registration Form </h1></center>
  <hr>
  <label> Firstname </label>
<input type="text" name="firstname" placeholder= "Firstname" size="15" required />
<label> Middlename: </label>
<input type="text" name="username" placeholder="Middlename" size="15" required />
<label> Lastname: </label>
<input type="text" name="lastname" placeholder="Lastname" size="15"required />
<div>
<label>
Proficiency:
</label>
<select name="proficiency">
<option value="Beginner">Beginner</option>
<option value="Intermediate">Intermediate</option>
<option value="Advance">Advance</option>
<option value="Expert">Expert</option>
</select>
</div>
<div>
<label>
Gender :
</label><br>
<input type="radio" value="Male" name="gender" checked > Male
<input type="radio" value="Female" name="gender"> Female
<input type="radio" value="Other" name="gender"> Other
</div>
<label>
Phone :
</label>
<input type="text" name="country code" placeholder="Country Code"  value="+91" size="2"/>
<input type="text" name="phone" placeholder="phone no." size="10"/ required>
</textarea>
<label for="email"><b>Email</b></label>
<input type="text" placeholder="Enter Email" name="email" required>
<div>
<label>
Willing tp practice :
</label><br>
<input type="radio" value="yes" name="practice" checked > Yes
<input type="radio" value="no" name="practice"> No
<input type="radio" value="maybe" name="practice"> May be
</div>
<button type="submit" class="registerbtn">Register</button>
</form>
<form action="DisplayServ">
<button type="submit" class="registerbtn" name="display">Display Participants</button>
</form>
</body>
</html>