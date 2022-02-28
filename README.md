<h1>Hospital Api</h1>
Hospital Api is a api designed for doctors of Hospital which has been allocated by the government for testing and quarantine + well being of COVID-19 patients
<h3>Routes Information</h3>
<ol type="1">
    <li>
        <b>/doctors/register:</b><br>
            For registration of doctors fill following data in body section of Postman
            <ol type="a">
                <li>name</li>
                <li>username</li>
                <li>email</li>
                <li>password</li>
                <li>confirmPassword</li>
            </ol>
    </li>
    <li>
        <b>/doctors/login:</b><br>
        For login of doctors fill following data in body section of Postman
            <ol type="a">
                <li>username</li>
                <li>password</li>
            </ol>
        <p>After login user will receive a json which contains jwt token, copy that jwt token for authentication.</p>
    </li>
    <li>
        <b>/patients/register:</b>
        For registration of patients fill following data in body section of Postman
            <ol type="a">
                <li>name</li>
                <li>email</li>
                <li>phone</li>
                <li>age</li>
            </ol>
        <p>After registration user will receive json object which has id of patients, copy that id. It will be useful for creating report of patients and getting all past reports of that patient.</p>
    </li>
    <li>
        <b>/patients/:id/create_report:</b>
        <p><b>:id</b> : This param will have value that you copied while registering the patient.</p>
         For creating report of patients fill following data in body section of Postman
            <ol type="a">
                <li>status</li>
            </ol>
    </li>
    <li>
        <b>/patients/:id/all_reports:</b>
        <p><b>:id</b> : This param will have value that you copied while registering the patient.</p>
    </li>
    <li>
        <b>/reports/:status</b>
        <p><b>:status</b> : This param will have enum value.</p>
        status value should be from following values:
        <ol type="a">
            <li>Negative</li>
            <li>Travelled-Quarantine</li>
            <li>Symptoms-Quarantine</li>
            <li>Positive-Admit</li>
        </ol>
    </li>
</ol>
<h3>How to Setup the Project :</h3>
    <ol type="1">
        <li>Install node.js v14.18.1</li>
        <li>Install all the libraries that are present in <b>package.json<b> .</li>
        <li>To start server type  <b><i>npm start</i></b> code in your terminal.</li>
        <li>
            <b>Requirements:</b>
            <ul>
                <li>Visual Studio</li>
                <li>MongoDB</li>
                <li>Robo 3T for data visulization.</li>
                <li>Browser <i>(Suggestion: Google Chrome)</i></li>
            </ul>
        </li>
    </ol>
<h2>Link: </h2>
    [Hospital Api](https://limitless-meadow-16004.herokuapp.com/)
