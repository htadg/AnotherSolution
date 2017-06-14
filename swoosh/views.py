import matplotlib.pyplot as plt

from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from .forms import NameForm
from .generate_report import report


def index(request):
    return render(request, 'swoosh/index.html')


def get_name(request):
    form = NameForm()
    return render(request, 'swoosh/name.html', {'form': form})

def get_verdict(request):
    if request.method != 'GET':
        return JsonResponse({'status': 'FAILURE', 'comment': 'Bad Request'}, status=200)
    try:
        name = request.GET['name']
    except Exception as e:
        print '[ERROR]: ', e
        name = None
    if name is None or name == '':
        return JsonResponse({'status': 'FAILURE', 'comment': 'Invalid Parameters'}, status=200)
    report_data = report(name)
    if report_data['status'] != 'OK':
        return JsonResponse({'status': 'FAILURE', 'comment': report_data['comment']}, status=200)
    return JsonResponse({'status': 'SUCCESS', 'result': report_data['result']}, status=200)


def matplot(request):
    return JsonResponse('something', safe=False)
