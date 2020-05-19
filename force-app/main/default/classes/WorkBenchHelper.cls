public with sharing class WorkBenchHelper {
    public WorkBenchHelper() {

    }
// 
    @AuraEnabled(cacheable=true)
    public static List<String> getObjectNames(){
        List<String> ls  = new List<String>();
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        for(String k : gd.keySet()){
            ls.add(gd.get(k).getDescribe().getName());
        }
        return ls;
    }


    @AuraEnabled(cacheable=true)
    public static List<String> getObjectFields(String objs){
        List<String> ls  = new List<String>();
        Map<String,object> m = Schema.getGlobalDescribe().get(objs).getDescribe().fields.getMap();
        for(String k : m.keySet()){
            ls.add(String.valueOf(m.get(k)));
        }
        return ls;
    }
}
