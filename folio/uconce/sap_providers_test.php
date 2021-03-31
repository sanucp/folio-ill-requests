<?php
    $baseUrl="http://152.74.16.111:8080/dswsbobje/qaawsservices/biws";
    $params="WSDL=1&cuid=AYKEpsMbDLtKgeYEZz7piYE";
    $username = "ws_biblioteca";
    $password ="x2F4%i3LaJ";

    $client = new SoapClient($baseUrl."?".$params, 
                                array(
                                    //'soap_version'   => SOAP_1_2
                                )
                            );

    //var_dump($client->__getFunctions());

    /*
array(2) {
  [0]=>
  string(125) "GetReportBlock_WS_FOLIO_BIBLIOTECAResponse GetReportBlock_WS_FOLIO_BIBLIOTECA(GetReportBlock_WS_FOLIO_BIBLIOTECA $parameters)"
  [1]=>
  string(98) "Drill_WS_FOLIO_BIBLIOTECAResponse Drill_WS_FOLIO_BIBLIOTECA(Drill_WS_FOLIO_BIBLIOTECA $parameters)"
}
    */
    //var_dump($client->__getTypes());


    /*
array(15) {
  [0]=>
  string(15) "string Operator"
  [1]=>
  string(61) "struct FilterCondition {
 string value;
 Operator operator;
}"
  [2]=>
  string(62) "struct LovValueIndex {
 string valueofPrompt;
 string index;
}"
  [3]=>
  string(76) "struct DrillFilter {
 string dimension;
 string value;
 Operator operator;
}"
  [4]=>
  string(497) "struct GetReportBlock_WS_FOLIO_BIBLIOTECA {
 string login;
 string password;
 FilterCondition _Country;
 FilterCondition _Proveedor;
 FilterCondition _Idnumber;
 FilterCondition _Nombre_Organización;
 FilterCondition _Name1;
 FilterCondition _City1;
 FilterCondition _City2;
 FilterCondition _Tel_Number;
 boolean resetState;
 boolean refresh;
 boolean getFromLatestDocumentInstance;
 boolean getFromUserInstance;
 boolean turnOutputToVTable;
 boolean closeDocument;
 int startRow;
 int endRow;
}"
  [5]=>
  string(21) "string DrillOperation"
  [6]=>
  string(81) "struct DrillPath {
 string from;
 string value;
 DrillOperation drillOperation;
}"
  [7]=>
  string(302) "struct Drill_WS_FOLIO_BIBLIOTECA {
 string login;
 string password;
 DrillPath drillPath;
 DrillFilter filter;
 boolean resetState;
 boolean refresh;
 boolean getFromLatestDocumentInstance;
 boolean getFromUserInstance;
 boolean turnOutputToVTable;
 boolean closeDocument;
 int startRow;
 int endRow;
}"
  [8]=>
  string(30) "struct TRow {
 anyType cell;
}"
  [9]=>
  string(28) "struct TTable {
 TRow row;
}"
  [10]=>
  string(29) "struct THeader {
 TRow row;
}"
  [11]=>
  string(29) "struct TFooter {
 TRow row;
}"
  [12]=>
  string(375) "struct GetReportBlock_WS_FOLIO_BIBLIOTECAResponse {
 TTable table;
 THeader headers;
 TFooter footers;
 string user;
 string documentation;
 string documentname;
 dateTime lastrefreshdate;
 dateTime creationdate;
 string creator;
 boolean isScheduled;
 dateTime scheduleStartTime;
 dateTime scheduleEndTime;
 string tableType;
 int nbColumns;
 int nbLines;
 string message;
}"
  [13]=>
  string(366) "struct Drill_WS_FOLIO_BIBLIOTECAResponse {
 TTable table;
 THeader headers;
 TFooter footers;
 string user;
 string documentation;
 string documentname;
 dateTime lastrefreshdate;
 dateTime creationdate;
 string creator;
 boolean isScheduled;
 dateTime scheduleStartTime;
 dateTime scheduleEndTime;
 string tableType;
 int nbColumns;
 int nbLines;
 string message;
}"
  [14]=>
  string(142) "struct QaaWSHeader {
 string sessionID;
 string serializedSession;
 string ClientType;
 string AuditingObjectID;
 string AuditingObjectName;
}"
}    
    */

    $wsRequest = array (
        "login" => $username,
        "password" => $password,
        "_Country"=>"",
        "_Proveedor"=>"",
        "_Idnumber"=>"",
        "_Nombre_Organización"=>"",
        "_Name1"=>"",
        "_City1"=>"",
        "_City2"=>"",
        "_Tel_Number"=>"",
        "resetState" => true,
        "refresh" => true,
        "getFromLatestDocumentInstance" => true,
        "getFromUserInstance" =>true,
        "turnOutputToVTable" => false,
        "closeDocument" => false,
        "startRow" =>1,
        "endRow" =>10
    );

    $res=$client->GetReportBlock_WS_FOLIO_BIBLIOTECA($wsRequest);
    var_dump($res);
?>