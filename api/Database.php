<?php
/*
 * @Author Rory Standley <rorystandley@gmail.com>
 * @Version 1.0
 * @Package Database
 */
class Database{
    /*
     * Create variables for credentials to MySQL database
     * The variables have been declared as private. This
     * means that they will only be available with the
     * Database class
     */
    private $db_host = "localhost";     // Change as required
    private $db_user = "judge";         // Change as required
    private $db_pass = "Judge2013";     // Change as required
    private $db_name = "onlinejudges";	// Change as required

    /*
     * Extra variables that are required by other function such as boolean con variable
     */
    private $con = false; // Check to see if the connection is active
    private $result = array(); // Any results from a query will be stored hereX

    // Function to make connection to database
    public function connect(){
        if(!$this->con){
            $myconn = @mysql_connect($this->db_host,$this->db_user,$this->db_pass);  // mysql_connect() with variables defined at the start of Database class
            if($myconn){
                $seldb = @mysql_select_db($this->db_name,$myconn); // Credentials have been pass through mysql_connect() now select the database
                if($seldb){
                    $this->con = true;
                    return true;  // Connection has been made return TRUE
                }else{
                    array_push($this->result,mysql_error());
                    return false;  // Problem selecting database return FALSE
                }
            }else{
                array_push($this->result,mysql_error());
                return false; // Problem connecting return FALSE
            }
        }else{
            return true; // Connection has already been made return TRUE 
        }
    }

    function __construct() {
        $this->connect();
    }

    // Function to disconnect from the database
    public function disconnect(){
        // If there is a connection to the database
        if($this->con){
            // We have found a connection, try to close it
            if(@mysql_close()){
                // We have successfully closed the connection, set the connection variable to false
                $this->con = false;
                // Return true tjat we have closed the connection
                return true;
            }else{
                // We could not close the connection, return false
                return false;
            }
        }
    }

    public function sql($sql){
        $query = @mysql_query($sql);
        if($query){
            // If the query returns >= 1 assign the number of rows to numResults
            if ($query === true) return true;
            $this->numResults = mysql_num_rows($query);
            // Loop through the query results by the number of rows returned
            for($i = 0; $i < $this->numResults; $i++){
                $r = mysql_fetch_array($query);
                $key = array_keys($r);
                for($x = 0; $x < count($key); $x++){
                    // Sanitizes keys so only alphavalues are allowed
                    if(!is_int($key[$x])){
                        if(mysql_num_rows($query) > 1){
                            $this->result[$i][$key[$x]] = $r[$key[$x]];
                        }else if(mysql_num_rows($query) < 1){
                            $this->result = null;
                        }else{
                            $this->result[$key[$x]] = $r[$key[$x]];
                        }
                    }
                }
            }
            return true; // Query was successful
        }else{
            array_push($this->result,mysql_error());
            return false; // No rows where returned
        }
    }

    // Function to SELECT from the database
    public function select($table, $rows = '*', $join = null, $where = null, $order = null, $limit = null){
        // Create query from the variables passed to the function
        $q = 'SELECT '.$rows.' FROM '.$table;
        if($join != null){
            $q .= ' JOIN '.$join;
        }
        if($where != null){
            if (is_array($where)) {
                $filter = $where;
                $where = " 0 = 0 ";
                $qs = "";
                for ($i=0;$i<count($filter);$i++){
                    switch($filter[$i]['data']['type']){
                        case 'string' : $qs .= " AND ".$filter[$i]['field']." LIKE '%".$filter[$i]['data']['value']."%'"; Break;
                        case 'list' :
                            if (strstr($filter[$i]['data']['value'],',')){
                                $fi = explode(',',$filter[$i]['data']['value']);
                                for ($q=0;$q<count($fi);$q++){
                                    $fi[$q] = "'".$fi[$q]."'";
                                }
                                $filter[$i]['data']['value'] = implode(',',$fi);
                                $qs .= " AND ".$filter[$i]['field']." IN (".$filter[$i]['data']['value'].")";
                            }else{
                                $qs .= " AND ".$filter[$i]['field']." = '".$filter[$i]['data']['value']."'";
                            }
                            Break;
                        case 'boolean' : $qs .= " AND ".$filter[$i]['field']." = ".($filter[$i]['data']['value']); Break;
                        case 'numeric' :
                            switch ($filter[$i]['data']['comparison']) {
                                case 'eq' : $qs .= " AND ".$filter[$i]['field']." = ".$filter[$i]['data']['value']; Break;
                                case 'lt' : $qs .= " AND ".$filter[$i]['field']." < ".$filter[$i]['data']['value']; Break;
                                case 'gt' : $qs .= " AND ".$filter[$i]['field']." > ".$filter[$i]['data']['value']; Break;
                            }
                            Break;
                        case 'date' :
                            switch ($filter[$i]['data']['comparison']) {
                                case 'eq' : $qs .= " AND ".$filter[$i]['field']." = '".date('Y-m-d',strtotime($filter[$i]['data']['value']))."'"; Break;
                                case 'lt' : $qs .= " AND ".$filter[$i]['field']." < '".date('Y-m-d',strtotime($filter[$i]['data']['value']))."'"; Break;
                                case 'gt' : $qs .= " AND ".$filter[$i]['field']." > '".date('Y-m-d',strtotime($filter[$i]['data']['value']))."'"; Break;
                            }
                            Break;
                    }
                }
                $where .= $qs;
            }
            $q .= ' WHERE '.$where;
        }
        if($order != null){
            $q .= ' ORDER BY '.$order;
        }
        if($limit != null){
            $q .= ' LIMIT '.$limit;
        }
        // Check to see if the table exists
        if($this->tableExists($table)){
            // The table exists, run the query
            $query = @mysql_query($q);
            if($query){
                // If the query returns >= 1 assign the number of rows to numResults
                $this->numResults = mysql_num_rows($query);
                // Loop through the query results by the number of rows returned
                for($i = 0; $i < $this->numResults; $i++){
                    $r = mysql_fetch_array($query);
                    $key = array_keys($r);
                    for($x = 0; $x < count($key); $x++){
                        // Sanitizes keys so only alphavalues are allowed
                        if(!is_int($key[$x])){
                            if(mysql_num_rows($query) > 1){
                                $this->result[$i][$key[$x]] = $r[$key[$x]];
                            }else if(mysql_num_rows($query) < 1){
                                $this->result = null;
                            }else{
                                $this->result[$key[$x]] = $r[$key[$x]];
                            }
                        }
                    }
                }
                return true; // Query was successful
            }else{
                array_push($this->result,mysql_error());
                return false; // No rows where returned
            }
        }else{
            return false; // Table does not exist
        }
    }

    // Function to insert into the database
    public function insert($table,$params=array()){
        // Check to see if the table exists
        if($this->tableExists($table)){
            $sql='INSERT INTO `'.$table.'` (`'.implode('`, `',array_keys($params)).'`) VALUES (\'' . implode('\', \'', $params) . '\')';
            // Make the query to insert to the database
            if($ins = @mysql_query($sql)){
                array_push($this->result,mysql_insert_id());
                return true; // The data has been inserted
            }else{
                array_push($this->result,mysql_error());
                return false; // The data has not been inserted
            }
        }else{
            return false; // Table does not exist
        }
    }

    //Function to delete table or row(s) from database
    public function delete($table,$where = null){
        // Check to see if table exists
        if($this->tableExists($table)){
            // The table exists check to see if we are deleting rows or table
            if($where == null){
                $delete = 'DELETE '.$table; // Create query to delete table
            }else{
                $delete = 'DELETE FROM '.$table.' WHERE '.$where; // Create query to delete rows
            }
            // Submit query to database
            if($del = @mysql_query($delete)){
                array_push($this->result,mysql_affected_rows());
                return true; // The query exectued correctly
            }else{
                array_push($this->result,mysql_error());
                return false; // The query did not execute correctly
            }
        }else{
            return false; // The table does not exist
        }
    }

    // Function to update row in database
    public function update($table,$params=array(),$where){
        // Check to see if table exists
        if($this->tableExists($table)){
            // Create Array to hold all the columns to update
            $args=array();
            foreach($params as $field=>$value){
                // Seperate each column out with it's corresponding value
                $args[]=$field.'="'.$value.'"';
            }
            // Create the query
            $sql='UPDATE '.$table.' SET '.implode(',',$args).' WHERE '.$where;
            // Make query to database
            if($query = @mysql_query($sql)){
                array_push($this->result,mysql_affected_rows());
                return true; // Update has been successful
            }else{
                array_push($this->result,mysql_error());
                return false; // Update has not been successful
            }
        }else{
            return false; // The table does not exist
        }
    }

    // Private function to check if table exists for use with queries
    private function tableExists($table){
        $tablesInDb = @mysql_query('SHOW TABLES FROM '.$this->db_name.' LIKE "'.$table.'"');
        if($tablesInDb){
            if(mysql_num_rows($tablesInDb)==1){
                return true; // The table exists
            }else{
                array_push($this->result,$table." does not exist in this database");
                return false; // The table does not exist
            }
        }
    }

    // Public function to return the data to the user
    public function getResult(){
        $val = $this->result;
        $this->result = array();
        return $val;
    }

    public function getGUID(){
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            $uuid = chr(123)// "{"
                .substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12)
                .chr(125);// "}"
            return $uuid;
        }
    }
} 