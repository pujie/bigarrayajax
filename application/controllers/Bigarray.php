<?php
class Bigarray extends CI_Controller{
    function __construct(){
        parent::__construct();
    }
    function ajax(){
        for($c=0;$c<1000;$c++){
            array_push($arr,$c);
        }
    }
    function clients(){
        $this->load->model('Data');
        $arr = array();
        $objs = new Data();
        foreach($objs->clients() as $obj){
            array_push ($arr,'{"id":"'.$obj->id.'","name":"'.$obj->name.'"}');
        }
        echo "[".implode(',',$arr)."]";
    }
    function index(){
        $this->load->view('ajax');
    }
    function ajaxwithtimesegment(){
        $this->load->view('ajaxwithtimesegment');
    }
}