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
    function ajaxwithtimesegment(){
        $this->load->view('ajaxwithtimesegment');
    }
    function autocomplete(){
        $this->load->view('autocomplete');
    }
    function clients(){
        $params = $this->input->post();
        $this->load->model('Data');
        $arr = array();
        $objs = new Data();
        foreach($objs->clients($params['filter']) as $obj){
            array_push ($arr,'{"id":"'.$obj->id.'","name":"'.$obj->name.'"}');
        }
        echo "[".implode(',',$arr)."]";
    }
    function index(){
        $this->load->view('ajax');
    }
    function combobox(){
        $this->load->view('combobox');
    }
    function test(){
        $this->load->view('test');
    }
}