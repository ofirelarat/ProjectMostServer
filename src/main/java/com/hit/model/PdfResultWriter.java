package com.hit.model;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.DefaultCategoryDataset;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfWriter;

public class PdfResultWriter {

	public static final String FILE_NAME = "src/main/resources/result.pdf";
	
	private static int column_count = 0;
	
	public static void writeFile(ResultAnalysis[] results){
		Document document = new Document();
		
		try{
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(new File(FILE_NAME)));
			
			document.open();
			
			Paragraph header = new Paragraph("Results analysis for game_id = " + results[0].getGameId() + " and user_id = " + results[0].getUserId());
			document.addTitle("Results analysis for game_id = " + results[0].getGameId() + " and user_id = " + results[0].getUserId());
			document.add(header);
			
			Arrays.sort(results,( r1,r2) -> r2.getLevel() - r1.getLevel());
			
			int maxLevel = results[0].getLevel();
			
            for(int i=0;i<= maxLevel;i++){
            	JFreeChart chart = getBarChart(results,i);
           
    			int width = column_count * 150;
                int height = 300;
                BufferedImage bufferedImage = chart.createBufferedImage(width, height);
                Image image = Image.getInstance(writer, bufferedImage, 1.0f);
                document.add(image);
            }
			
			document.close();
		}catch (FileNotFoundException | DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private static JFreeChart getBarChart(ResultAnalysis[] results,int level){
		DefaultCategoryDataset dataset = new DefaultCategoryDataset();
		int count=0;
		
		for(int i=results.length-1;i>=0;i--){
			if(results[i].getLevel() == level && count < 5){
				dataset.setValue(results[i].getErrors(), "errors", results[i].getTime());
				dataset.setValue(results[i].getScore(), "score", results[i].getTime());

				count++;
			}
		}
		
		column_count = count;
		level++;
		return ChartFactory.createBarChart("result analysis score for level: " + level, "Date", "Errors/Score", dataset, PlotOrientation.VERTICAL,false, true, false);
	}
}
