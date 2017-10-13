<?php
class Data extends CI_Model{
    function __construct(){
        parent::__construct();
    }
    function clients(){
        $sql = 'select id,name from clients ';
        $que = $this->db->query($sql);
        return $que->result();
    }
}