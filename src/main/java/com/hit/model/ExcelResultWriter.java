package com.hit.model;

import java.io.File;
import java.io.IOException;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

public class ExcelResultWriter {
	
	public static final String FILE_NAME = "src/main/resources/results.xls";
	
	public static void writeFile(ResultAnalysis[] results){
        WritableWorkbook book = null;
        
        try {
			book = Workbook.createWorkbook(new File(FILE_NAME));
			
			// create an Excel sheet
            WritableSheet excelSheet = book.createSheet("result for game:" + results[0].getGameId() + " user:" + results[0].getUserId(), 0);
            
            WritableCellFormat cFormat = new WritableCellFormat();
            WritableFont font = new WritableFont(WritableFont.ARIAL, 12, WritableFont.BOLD);
            cFormat.setFont(font);
            
	    	Label label1 = new Label(1, 0, "game id",cFormat);
	        excelSheet.addCell(label1);
	        Label label2 = new Label(2, 0, "user id",cFormat);
	        excelSheet.addCell(label2);
	        Label label3 = new Label(3, 0, "time",cFormat);
	        excelSheet.addCell(label3);
	        Label label4 = new Label(4, 0, "level",cFormat);
	        excelSheet.addCell(label4);
	        Label label5 = new Label(5, 0, "count per level",cFormat);
	        excelSheet.addCell(label5);
	        Label label6 = new Label(6, 0, "errors per level",cFormat);
	        excelSheet.addCell(label6);
	        
            for (int i=0;i<results.length;i++) {          
             	Label num = new Label(0, i+1,String.valueOf(i+1));
    	        excelSheet.addCell(num);
            	label1 = new Label(1, i+1, String.valueOf(results[i].getGameId()));
    	        excelSheet.addCell(label1);
    	        label2 = new Label(2, i+1, String.valueOf(results[i].getUserId()));
    	        excelSheet.addCell(label2);
    	        label3 = new Label(3, i+1, results[i].getTime());
    	        excelSheet.addCell(label3);
    	        label4 = new Label(4, i+1, String.valueOf(results[i].getLevel()));
    	        excelSheet.addCell(label4);
    	        label5 = new Label(5, i+1, String.valueOf(results[i].getScore()));
    	        excelSheet.addCell(label5);
    	        label6 = new Label(6, i+1, String.valueOf(results[i].getErrors()));
    	        excelSheet.addCell(label6);
			}
            
            book.write();
		} catch (IOException | WriteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			if(book!=null){
				try {
					book.close();
				} catch (WriteException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
}
