<?php
class Data extends CI_Model{
    function __construct(){
        parent::__construct();
    }
    function clients($filter){
        $sql = 'select id,name from clients ';
        $sql.= 'where name like "%' . $filter . '%" ';
        $que = $this->db->query($sql);
        return $que->result();
    }
}